import { autorun, observable } from 'mobx'

import { config,NOT_INITIALIZED_ERROR } from '../config'
import { getTargetContainer, http, Query } from '../helpers/utils'
import defaultTheme from './gitment_theme'

const scope = 'public_repo'

function extendRenderer(instance, renderer) {
    instance[renderer] = (container) => {
        const targetContainer = getTargetContainer(container)
        const render = instance.theme[renderer] || instance.defaultTheme[renderer]

        autorun(() => {
            const e = render(instance.state, instance)
            if (targetContainer.firstChild) {
                targetContainer.replaceChild(e, targetContainer.firstChild)
            } else {
                targetContainer.appendChild(e)
            }
        })

        return targetContainer
    }
}

class Gitment {
    get accessToken() {
        return localStorage.getItem(config.guest.access_token_key)
    }
    set accessToken(token) {
        localStorage.setItem(config.guest.access_token_key, token)
    }

    get loginLink() {
        const oauthUri = 'https://github.com/login/oauth/authorize'
        const redirect_uri = this.oauth.redirect_uri || window.location.href

        const oauthParams = Object.assign({
            scope,
            redirect_uri,
        }, this.oauth)

        return `${oauthUri}${Query.stringify(oauthParams)}`
    }

    constructor(options = {}) {
        this.defaultTheme = defaultTheme
        this.useTheme(defaultTheme)

        Object.assign(this, {
            id: window.location.href,
            title: window.document.title,
            link: window.location.href,
            desc: '',
            labels: [],
            theme: defaultTheme,
            oauth: config.user,
            owner: config.user.name,
            repo: config.user.repo,
            perPage: 20,
            maxCommentHeight: 250,
            meta:{}
        }, options)

        this.useTheme(this.theme)

        const user = {}
        try {
            const userInfo = localStorage.getItem(config.guest.user_key)
            if (this.accessToken && userInfo) {
                Object.assign(user, JSON.parse(userInfo), {
                    fromCache: true,
                })
            }
        } catch (e) {
            localStorage.removeItem(config.guest.user_key)
        }

        this.state = observable({
            user,
            error: null,
            meta: {},
            comments: undefined,
            reactions: [],
            commentReactions: {},
            currentPage: 1,
        })

        const query = Query.parse()
        if (query.code) {
            const { client_id, client_secret } = this.oauth
            const code = query.code
            delete query.code
            const search = Query.stringify(query)
            const replacedUrl = `${window.location.origin}${window.location.pathname}${search}${window.location.hash}`
            history.replaceState({}, '', replacedUrl)

            Object.assign(this, {
                id: replacedUrl,
                link: replacedUrl,
            }, options)

            this.state.user.isLoggingIn = true
            http.post('https://github.com/login/oauth/access_token', {
                code,
                client_id,
                client_secret,
            }, '')
                .then(data => {
                    this.accessToken = data.access_token
                    this.update()
                })
                .catch(e => {
                    this.state.user.isLoggingIn = false
                    alert(e)
                })
        } else {
            this.update()
        }
    }

    init() {
        return this.createIssue()
            .then(() => this.loadComments())
            .then(comments => {
                this.state.error = null
                return comments
            })
    }

    useTheme(theme = {}) {
        this.theme = theme

        const renderers = Object.keys(this.theme)
        renderers.forEach(renderer => extendRenderer(this, renderer))
    }

    update() {
        return Promise.all([this.loadMeta(), this.loadUserInfo()])
            .then(() => Promise.all([
                this.loadComments().then(() => this.loadCommentReactions()),
                this.loadReactions(),
            ]))
            .catch(e => this.state.error = e)
    }

    markdown(text) {
        return http.post('/markdown', {
            text,
            mode: 'gfm',
        })
    }

    createIssue() {
        const { id, owner, repo, title, link, desc, labels } = this

        return http.post(`/repos/${owner}/${repo}/issues`, {
            title,
            labels: labels.concat(['gitment', id]),
            body: `${link}\n\n${desc}`,
        })
            .then((meta) => {
                this.state.meta = meta
                return meta
            })
    }

    getIssue() {
        if (this.state.meta.id) return Promise.resolve(this.state.meta)

        return this.loadMeta()
    }


    post(body) {
        return this.getIssue()
            .then(issue => http.post(issue.comments_url, { body }, ''))
            .then(data => {
                this.state.meta.comments++
                const pageCount = Math.ceil(this.state.meta.comments / this.perPage)
                if (this.state.currentPage === pageCount) {
                    this.state.comments.push(data)
                }
                return data
            })
    }

    loadMeta() {
        this.state.meta=this.meta;
        return this.meta;
    }

    loadComments(page = this.state.currentPage) {
        const { id, owner, repo } = this
        return http.get(`/repos/${owner}/${repo}/issues/${id}/comments`,{ page, per_page: this.perPage })
            .then((comments) => {
                this.state.comments = comments
                return comments
            })
    }

    loadUserInfo() {
        if (!this.accessToken) {
            this.logout()
            return Promise.resolve({})
        }

        return http.get('/user')
            .then((user) => {
                this.state.user = user
                localStorage.setItem(config.guest.user_key, JSON.stringify(user))
                return user
            })
    }

    loadReactions() {
        if (!this.accessToken) {
            this.state.reactions = []
            return Promise.resolve([])
        }

        return this.getIssue()
            .then((issue) => {
                if (!issue.reactions.total_count) return []
                return http.get(issue.reactions.url, {}, '')
            })
            .then((reactions) => {
                this.state.reactions = reactions
                return reactions
            })
    }

    loadCommentReactions() {
        if (!this.accessToken) {
            this.state.commentReactions = {}
            return Promise.resolve([])
        }

        const comments = this.state.comments

        const comentReactions = {}

        return Promise.all(comments.map((comment) => {
            if (!comment.reactions.total_count) return []

            const { owner, repo } = this
            return http.get(`/repos/${owner}/${repo}/issues/comments/${comment.id}/reactions`, {})
        }))
            .then(reactionsArray => {
                comments.forEach((comment, index) => {
                    comentReactions[comment.id] = reactionsArray[index]
                })
                this.state.commentReactions = comentReactions

                return comentReactions
            })
    }

    login() {
        window.location.href = this.loginLink
    }

    logout() {
        localStorage.removeItem(config.guest.access_token_key)
        localStorage.removeItem(config.guest.user_key)
        this.state.user = {}
    }

    goto(page) {
        this.state.currentPage = page
        this.state.comments = undefined
        return this.loadComments(page)
    }

    like() {
        if (!this.accessToken) {
            alert('Login to Like')
            return Promise.reject()
        }

        const { owner, repo } = this

        return http.post(`/repos/${owner}/${repo}/issues/${this.state.meta.number}/reactions`, {
            content: 'heart',
        })
            .then(reaction => {
                this.state.reactions.push(reaction)
                this.state.meta.reactions.heart++
            })
    }

    unlike() {
        if (!this.accessToken) return Promise.reject()


        const { user, reactions } = this.state
        const index = reactions.findIndex(reaction => reaction.user.login === user.login)
        return http.delete(`/reactions/${reactions[index].id}`)
            .then(() => {
                reactions.splice(index, 1)
                this.state.meta.reactions.heart--
            })
    }

    likeAComment(commentId) {
        if (!this.accessToken) {
            alert('Login to Like')
            return Promise.reject()
        }

        const { owner, repo } = this
        const comment = this.state.comments.find(comment => comment.id === commentId)

        return http.post(`/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`, {
            content: 'heart',
        })
            .then(reaction => {
                this.state.commentReactions[commentId].push(reaction)
                comment.reactions.heart++
            })
    }

    unlikeAComment(commentId) {
        if (!this.accessToken) return Promise.reject()

        const reactions = this.state.commentReactions[commentId]
        const comment = this.state.comments.find(comment => comment.id === commentId)
        const { user } = this.state
        const index = reactions.findIndex(reaction => reaction.user.login === user.login)

        return http.delete(`/reactions/${reactions[index].id}`)
            .then(() => {
                reactions.splice(index, 1)
                comment.reactions.heart--
            })
    }
}

export default Gitment
