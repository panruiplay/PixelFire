import Rect from './Rect'
import Game from './Game'

/**
 * 用户控制器，监听键盘事件，鼠标事件等
 */
class Control {
    disabled = []           // 禁用按键数组
    disableMouse = false    // 禁用鼠标监听
    keyEvt = {
        // key: [fn, fn, fn]
    }
    
    OL = 0  // root容器与浏览器左边距离
    OT = 0  // root容器与浏览器顶边距离
    
    // 方向键监听使用
    count = 0
    x = 0
    y = 0
    deg = {
        'v00': 0,
        'v10': 0,
        'v1-1': 45,
        'v0-1': 90,
        'v-1-1': 135,
        'v-10': 180,
        'v11': -45,
        'v01': -90,
        'v-11': -135
    }
    
    constructor() {
        window.onresize = () => {
            let { left, top } = Game.domRoot.getBoundingClientRect()
            this.OL = left + 5
            this.OT = top + 5
        }
        window.onresize()
        
        document.onkeydown = this._down_interface.bind(this)
        document.onkeyup = this._up_interface.bind(this)
        document.onmousemove = this._mouse_interface.bind(this)
        
        // 监听方向键
        this.onKeyDown(87, () => this.dirKeyDown(1))
        this.onKeyDown(65, () => this.dirKeyDown(4))
        this.onKeyDown(68, () => this.dirKeyDown(2))
        this.onKeyDown(83, () => this.dirKeyDown(3))
        this.onKeyUp(87, () => this.dirKeyUp(1))
        this.onKeyUp(65, () => this.dirKeyUp(4))
        this.onKeyUp(68, () => this.dirKeyUp(2))
        this.onKeyUp(83, () => this.dirKeyUp(3))
    }
    
    // keydown接口
    _down_interface(evt) {
        let code = evt.keyCode
        if(this.disabled.find(v => v == code)) return
        code = 'k' + code
        let evtArr = this.keyEvt[code]
        if(evtArr) {
            evtArr.forEach(v => v())
        }
    }
    // keyup接口
    _up_interface(evt) {
        let code = evt.keyCode
        if(this.disabled.find(v => v == code)) return
        code = 'c' + code
        let evtArr = this.keyEvt[code]
        if(evtArr) {
            evtArr.forEach(v => v())
        }
    }
    // 鼠标接口
    _mouse_interface(evt) {
        if(this.disableMouse) return
        
        this.mouseX = evt.pageX - this.OL
        this.mouseY = evt.pageY - this.OT
        
        let evtArr = this.keyEvt['mouseMove']
        if(evtArr) {
            evtArr.forEach(v => v(this.mouseX, this.mouseY))
        }
    }
    
    // 方向键监听 & 控制
    dirReset = () => {
        this.count = this.x = this.y = 0
        this.dirTrigger(this.count, undefined)
    }
    dirKeyDown = (key) => {
        if(key == 1) {
            if(this.y == 0) this.count++
            this.y = 1
        } else if(key == 2) {
            if(this.x == 0) this.count++
            this.x = 1
        } else if(key == 3) {
            if(this.y == 0) this.count++
            this.y = -1
        } else {
            if(this.x == 0) this.count++
            this.x = -1
        }
        this.dirTrigger(this.count, this.deg['v' + this.x + this.y])
    }
    dirKeyUp = (key) => {
        if(key == 1 && this.y == 1 || key == 3 && this.y == -1) {
            this.y = 0
            this.count--
        } else if(key == 2 && this.x == 1 || key == 4 && this.x == -1) {
            this.x = 0
            this.count--
        }
        this.dirTrigger(this.count, this.deg['v' + this.x + this.y])
    }
    dirTrigger = (count, deg) => {
        let evtArr = this.keyEvt['dirChange']
        if(evtArr) {
            evtArr.forEach(v => v(count, deg))
        }
    }
    
    // 禁用方向键监听
    disableDirectionKey() {
        this.disabled = this.disabled.concat(['87', '65', '68', '83'])
        this.dirReset()
    }
    // 启用方向键监听
    enableDirectionKey() {
        this.disabled = this.disabled.filter(v => v != 87 && v != 65 && v != 68 && v != 83)
        this.dirReset()
    }
    
    /**
     * 注册方向键变化事件，当方向键变化时，调用回调函数，传入当前按下的方向键数和方向（deg）
     * @param {function(count:number, dir:number)} fn - 回调函数
     */
    onDirChange(fn) {
        let key = 'dirChange'
        if(this.keyEvt[key]) {
            this.keyEvt[key].push(fn)
        } else {
            this.keyEvt[key] = [fn]
        }
    }
    /**
     * 注册按下键事件
     * @param {string|number} key - 键值
     * @param {function} fn - 回调函数
     */
    onKeyDown(key, fn) {
        key = 'k' + key
        if(this.keyEvt[key]) {
            this.keyEvt[key].push(fn)
        } else {
            this.keyEvt[key] = [fn]
        }
    }
    /**
     * 注册松开键事件
     * @param {string|number} key - 键值
     * @param {function} fn - 回调函数
     */
    onKeyUp(key, fn) {
        key = 'c' + key
        if(this.keyEvt[key]) {
            this.keyEvt[key].push(fn)
        } else {
            this.keyEvt[key] = [fn]
        }
    }
    /**
     * 注册鼠标移动事件
     * @param {function(number:x, number:y)} fn - 回调函数
     */
    onMouseMove(fn) {
        let key = 'mouseMove'
        if(this.keyEvt[key]) {
            this.keyEvt[key].push(fn)
        } else {
            this.keyEvt[key] = [fn]
        }
    }
}

export default Control
