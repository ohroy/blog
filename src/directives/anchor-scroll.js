module.exports = {
    install: function (Vue) {
        Vue.directive('smooth-scroll', {
            inserted: function (el) {
                // Do not initialize smoothScroll when running server side, handle it in client
                // We do not want this script to be applied in browsers that do not support those
                // That means no smoothscroll on IE9 and below.
                if (typeof window !== 'object' || window.pageYOffset === void 0) return

                // Attach the smoothscroll function
                el.addEventListener('click', function (ev) {

                    var scrollTo = document.getElementById(this.hash.substring(1))
                    if(!scrollTo) return

                    ev.preventDefault()

                    // Using the history api to solve issue: back doesn't work
                    // most browser don't update :target when the history api is used:
                    // THIS IS A BUG FROM THE BROWSERS.
                    if (window.history.pushState && location.hash !== this.hash) window.history.pushState('', '', this.hash)

                    var duration = 500 //ms
                    var clock = Date.now()

                    // Get the top position of an element in the document
                    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
                    var end = scrollTo.nodeName === 'HTML' ? -window.pageYOffset : scrollTo.getBoundingClientRect().top + window.pageYOffset

                    // we use requestAnimationFrame to be called by the browser before every repaint
                    var requestAnimationFrame = window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
                        function (fn) {window.setTimeout(fn, 15)}

                    var step = function () {
                        // the time elapsed from the beginning of the scroll
                        var elapsed = Date.now() - clock
                        // calculate the scroll position we should be in
                        var position = end
                        if (elapsed < duration){
                            position = window.pageYOffset + (end - window.pageYOffset) * easeInOutCubic(elapsed / duration)
                            requestAnimationFrame(step)
                        }else{
                            location.replace('#' + scrollTo.id)
                            // this will cause the :target to be activated.
                        }
                        window.scroll(0, position)
                    }
                    step()
                })
            }
        })
    }
}

// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
function easeInOutCubic (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }