let dom = {
    create(tag, className) {
        let el = document.createElement(tag)
        if(className) el.className = className
        return el
    },
    formatSpace(str) { return str.replace(/^ +| +$| (?= )/g, '') },
    addClass(obj, name) {
        return obj.className = dom.formatSpace(obj.className + ' ' + name)
    },
    removeClass(obj, name) {
        return obj.className = dom.formatSpace(obj.className.replace(new RegExp(name, 'g'), ''))
    },
    animationEnd(target, fn, isOnce = true) {
        function tmp() {
            fn()
            if(isOnce) {
                target.removeEventListener('webkitAnimationEnd', tmp)
                target.removeEventListener('animationend', tmp)
            }
        }
        target.addEventListener('webkitAnimationEnd', tmp)
        target.addEventListener('animationend', tmp)
    },
    hide(target) {
        target.style.display = 'none'
        return target
    },
    show(target, type = 'block') {
        target.style.display = type
        return target
    },
    search(target) {return document.querySelector(target)},
    searchAll(target) {return document.querySelectorAll(target)},
    on(target, event, fn) {
        if(target === '' + target) target = dom.search(target)
        target.addEventListener(event, fn)
    }
}
export default dom