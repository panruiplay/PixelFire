import { $$, addClass, addEventAgent, hasClass, removeClass } from '../utils'
import Game from './Game'
import Chain from 'func-chain'

class UI {
    panels = {}     // 所有的面板
    current = null  // 当前显示的面板
    transitionTime = 700    // 面板过度时间
    
    constructor() {
        let arr = Array.from($$('.panel'))
        
        arr.forEach(v => {
            v.style.transition = `opacity ${this.transitionTime}ms`
            this.panels[v.id] = v
        })
        
        // 当前显示面板
        this.current = arr.find(v => !hasClass(v.className, 'hide'))
        
        // 注册所有Btn点击音效(所有有btn样式的元素点击时，产生音效)
        addEventAgent(Game.domRoot, 'btn', 'click', () => Game.Music.play('click'))
    }
    
    // 隐藏当前面板
    hide = (cb) => {
        addClass(this.current, 'opacity0')
        setTimeout(() => {
            addClass(this.current, 'hide')
            removeClass(this.current, 'opacity0')
            cb && cb()
        }, this.transitionTime)
    }
    // 显示面板
    show = (name, cb) => {
        let target = this.panels[name],
            time   = this.transitionTime
        this.current = target
        
        addClass(target, 'opacity0')
        removeClass(target, 'hide')
        
        Chain()
        > function (next) { setTimeout(next, 50) }
        > function (next) {
            addClass(target, 'opacity1')
            setTimeout(next, time)
        }
        > function () {
            removeClass(target, 'opacity1', 'opacity0')
            cb && cb()
        }
        || Chain.go()
    }
    // 切换面板
    change = (name, cb) => {
        Chain()
        > this.hide
        > this.show.args(name)
        > cb
        || Chain.go()
    }
}

export default UI
