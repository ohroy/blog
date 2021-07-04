import { github as githubIcon, heart as heartIcon, spinner as spinnerIcon } from './gitment_icon'
import { NOT_INITIALIZED_ERROR } from '../config'

function renderHeader({ meta, user, reactions }, instance) {
    const container = document.createElement('div')
    container.lang = "en-US"
    container.className = 'gitment-container gitment-header-container'


    const commentsCount = document.createElement('span')
    commentsCount.innerHTML = `
    ${ meta.comments
        ? ` Total <strong>${meta.comments}</strong> Comments`
        : ''
        }
  `
    container.appendChild(commentsCount)

    return container
}

function renderComments({ meta, comments, commentReactions, currentPage, user, error }, instance) {
    const container = document.createElement('div')
    container.lang = "en-US"
    container.className = 'gitment-container gitment-comments-container'

    if (error) {
        const errorBlock = document.createElement('div')
        errorBlock.className = 'gitment-comments-error'

        if (error === NOT_INITIALIZED_ERROR
            && user.login
            && user.login.toLowerCase() === instance.owner.toLowerCase()) {
            const initHint = document.createElement('div')
            const initButton = document.createElement('button')
            initButton.className = 'gitment-comments-init-btn'
            initButton.onclick = () => {
                initButton.setAttribute('disabled', true)
                instance.init()
                    .catch(e => {
                        initButton.removeAttribute('disabled')
                        alert(e)
                    })
            }
            initButton.innerText = 'Initialize Comments'
            initHint.appendChild(initButton)
            errorBlock.appendChild(initHint)
        } else {
            errorBlock.innerText = error
        }
        container.appendChild(errorBlock)
        return container
    } else if (comments === undefined) {
        const loading = document.createElement('div')
        loading.innerText = 'Loading comments...'
        loading.className = 'gitment-comments-loading'
        container.appendChild(loading)
        return container
    } else if (!comments.length) {
        const emptyBlock = document.createElement('div')
        emptyBlock.className = 'gitment-comments-empty'
        emptyBlock.innerText = '这篇文章还没有评论'
        container.appendChild(emptyBlock)
        return container
    }

    const commentsList = document.createElement('ul')
    commentsList.className = 'gitment-comments-list'

    comments.forEach(comment => {
        const createDate = new Date(comment.created_at)
        const updateDate = new Date(comment.updated_at)
        const commentItem = document.createElement('li')
        commentItem.className = 'gitment-comment'
        commentItem.innerHTML = `
      <a class="gitment-comment-avatar" href="${comment.user.html_url}" target="_blank">
        <img class="gitment-comment-avatar-img" src="${comment.user.avatar_url}"/>
      </a>
      <div class="gitment-comment-main">
        <div class="gitment-comment-header">
          <a class="gitment-comment-name" href="${comment.user.html_url}" target="_blank">
            ${comment.user.login}
          </a>
          commented on
          <span title="${createDate}">${createDate.toDateString()}</span>
          ${ createDate.toString() !== updateDate.toString()
            ? ` • <span title="comment was edited at ${updateDate}">edited</span>`
            : ''
            }
          <div class="gitment-comment-like-btn">${heartIcon} ${comment.reactions.heart || ''}</div>
        </div>
        <div class="gitment-comment-body markdown-body">${comment.body_html}</div>
      </div>
    `
        const likeButton = commentItem.querySelector('.gitment-comment-like-btn')
        const likedReaction = commentReactions[comment.id]
            && commentReactions[comment.id].find(reaction => (
                reaction.content === 'heart' && reaction.user.login === user.login
            ))
        if (likedReaction) {
            likeButton.classList.add('liked')
            likeButton.onclick = () => instance.unlikeAComment(comment.id)
        } else {
            likeButton.classList.remove('liked')
            likeButton.onclick = () => instance.likeAComment(comment.id)
        }

        // dirty
        // use a blank image to trigger height calculating when element rendered
        const imgTrigger = document.createElement('img')
        const markdownBody = commentItem.querySelector('.gitment-comment-body')
        imgTrigger.className = 'gitment-hidden'
        imgTrigger.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        imgTrigger.onload = () => {
            if (markdownBody.clientHeight > instance.maxCommentHeight) {
                markdownBody.classList.add('gitment-comment-body-folded')
                markdownBody.style.maxHeight = instance.maxCommentHeight + 'px'
                markdownBody.title = 'Click to Expand'
                markdownBody.onclick = () => {
                    markdownBody.classList.remove('gitment-comment-body-folded')
                    markdownBody.style.maxHeight = ''
                    markdownBody.title = ''
                    markdownBody.onclick = null
                }
            }
        }
        commentItem.appendChild(imgTrigger)

        commentsList.appendChild(commentItem)
    })

    container.appendChild(commentsList)

    if (meta) {
        const pageCount = Math.ceil(meta.comments / instance.perPage)
        if (pageCount > 1) {
            const pagination = document.createElement('ul')
            pagination.className = 'gitment-comments-pagination'

            if (currentPage > 1) {
                const previousButton = document.createElement('li')
                previousButton.className = 'gitment-comments-page-item'
                previousButton.innerText = 'Previous'
                previousButton.onclick = () => instance.goto(currentPage - 1)
                pagination.appendChild(previousButton)
            }

            for (let i = 1; i <= pageCount; i++) {
                const pageItem = document.createElement('li')
                pageItem.className = 'gitment-comments-page-item'
                pageItem.innerText = i
                pageItem.onclick = () => instance.goto(i)
                if (currentPage === i) pageItem.classList.add('gitment-selected')
                pagination.appendChild(pageItem)
            }

            if (currentPage < pageCount) {
                const nextButton = document.createElement('li')
                nextButton.className = 'gitment-comments-page-item'
                nextButton.innerText = 'Next'
                nextButton.onclick = () => instance.goto(currentPage + 1)
                pagination.appendChild(nextButton)
            }

            container.appendChild(pagination)
        }
    }

    return container
}

function render(state, instance) {
    const container = document.createElement('div')
    container.lang = "en-US"
    container.className = 'col-12 col-md-12'
    container.appendChild(instance.renderHeader(state, instance))
    container.appendChild(instance.renderComments(state, instance))
    return container
}

export default { render, renderHeader, renderComments }