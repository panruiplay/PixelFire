import Game from '../Game'

let Control = {},
    count   = 0,
    x       = 0,
    y       = 0,
    deg     = {
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

function reset() {
    count = x = y = 0
    Control.onDirChange && Control.onDirChange(count, undefined)
}

function keyDown(key) {
    if(key == 1) {
        if(y == 0) count++
        y = 1
    } else if(key == 2) {
        if(x == 0) count++
        x = 1
    } else if(key == 3) {
        if(y == 0) count++
        y = -1
    } else {
        if(x == 0) count++
        x = -1
    }
    Control.onDirChange && Control.onDirChange(count, deg['v' + x + y])
}

function keyUp(key) {
    if(key == 1 && y == 1 || key == 3 && y == -1) {
        y = 0
        count--
    } else if(key == 2 && x == 1 || key == 4 && x == -1) {
        x = 0
        count--
    }
    Control.onDirChange && Control.onDirChange(count, deg['v' + x + y])
}

/*****************************************************/

let OL, OT
window.onresize = function () {
    let { left, top } = Game.container.getBoundingClientRect()
    OL = left + 5
    OT = top + 5
}

Control = {
    // 禁用键
    disableMap: {},
    // 禁用鼠标
    disableMouse: false,
    // keydown接口
    down_interface(evt) {
        let key = 'k' + evt.keyCode

        if(this.disableMap[key]) return

        this[key] && this[key]()
    },
    // keyup接口
    up_interface(evt) {
        let key = 'c' + evt.keyCode

        if(this.disableMap[key]) return

        this[key] && this[key]()
    },
    // 鼠标接口
    mouse_interface(evt) {
        if(this.disableMouse) return

        this.mouseX = evt.pageX - OL
        this.mouseY = evt.pageY - OT
    },
    /*----------------- 对外提供的方法 -----------------*/
    // 重置方向键
    directionReset: reset,
    // 方向改变时触发
    onDirChange: function () {},
    // 鼠标移动
    onMouseMove: function () {},
    // 禁用方向键
    disableDirectionKey() {
        ['k87', 'c87', 'k65', 'c65', 'k68', 'c68', 'k83', 'c83'].forEach(v => this.disableMap[v] = 1)
        this.directionReset()
    },
    //启用方向键
    enableDirectionKey() {
        ['k87', 'c87', 'k65', 'c65', 'k68', 'c68', 'k83', 'c83'].forEach(v => this.disableMap[v] = 0)
        this.directionReset()
    },

    /*---------------- 具体某个键的方法 ----------------*/
    k87() { keyDown(1) },
    k65() { keyDown(4) },
    k68() { keyDown(2) },
    k83() { keyDown(3) },
    c87() { keyUp(1) },
    c65() { keyUp(4) },
    c68() { keyUp(2) },
    c83() { keyUp(3) }
}

document.onkeydown = Control.down_interface.bind(Control)
document.onkeyup = Control.up_interface.bind(Control)
document.onmousemove = Control.mouse_interface.bind(Control)

export default Control