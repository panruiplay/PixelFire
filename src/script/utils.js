/* -------------∽-★-∽---元素 & 事件---∽-★-∽------------- */
// 搜索器
export function $(selector) {
    return document.querySelector(selector)
}
// 搜索器（全部）
export function $$(selector) {
    return document.querySelectorAll(selector)
}
// 创建dom元素
export function createDom(name, cls = '') {
    let dom = document.createElement(name)
    dom.className = cls
    return dom
}
// 事件代理 dom可以是元素或者字符串
export function addEventAgent(dom, targetCls, type, fn) {
    let reg = RegExp('(^| )' + targetCls + '($| )')
    let _fn = function (e) {
        if(reg.test(e.target.className)) fn(e)
    }
    
    if(typeof dom === 'string') dom = $(dom)
    
    dom.addEventListener(type, _fn)
    
    return function () {
        dom.removeEventListener(type, _fn)
    }
}
// 添加事件 事件触发一次后上锁，1秒后解锁
export function addEventLock(dom, type, fn) {
    if(typeof dom === 'string') dom = $(dom)
    
    let lock = false
    
    let _fn = function (e) {
        if(lock) return
        lock = true
        setTimeout(() => lock = false, 1000)
        
        fn(e)
    }
    
    dom.addEventListener(type, _fn)
    
    return function () {
        dom.removeEventListener(type, _fn)
    }
}
// 添加一次性事件
export function addEventOnce(dom, type, fn) {
    if(typeof dom === 'string') dom = $(dom)
    
    let _fn = function (e) {
        fn(e)
        dom.removeEventListener(type, _fn)
    }
    
    dom.addEventListener(type, _fn)
}

/* -------------∽-★-∽---样式类---∽-★-∽------------- */
// 是否包含某个样式名
export function hasClass(classNameStr, targetCls) {
    let reg = RegExp('(^| )' + targetCls + '($| )')
    return reg.test(classNameStr)
}
// 添加样式
export function addClass(dom, ...cls) {
    dom.className += ' ' + cls.join(' ')
}
// 删除样式
export function removeClass(dom, ...cls) {
    let className = dom.className
    for(let i = 0; i < cls.length; i++) {
        className = className.replace(RegExp('(^| )' + cls[i] + '($| )', 'g'), ' ')
    }
    dom.className = className
}

/* -------------∽-★-∽---其它---∽-★-∽------------- */
// 取得文件名，不包含后缀
export function getFileName(url) {
    return url.split('/').pop().split('.')[0]
}
