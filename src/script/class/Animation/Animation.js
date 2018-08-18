import Game from '../Game'
import { createDom } from '../../utils'

/**
 * 动画类: new Animation().show()
 */
class Ani {
    static baseClass = 'ani'
    
    dom = null      // dom对象
    music = ''      // 音乐
    width = 0
    height = 0
    
    constructor(width, height, className, music) {
        this.dom = createDom('div', Ani.baseClass + ' ' + className)
        this.width = width
        this.height = height
        this.music = music
    }
    
    show = (x, y, cb) => {
        x = x - this.width / 2
        y = y - this.height / 2
        
        this.dom.style.cssText = `left: ${x}px; top: ${y}px;`
        
        let end = () => {
            Game.domRoot.removeChild(this.dom)
            this.dom.removeEventListener('webkitAnimationEnd', end)
            this.dom.removeEventListener('animationend', end)
            cb && cb()
        }
        
        this.dom.addEventListener('webkitAnimationEnd', end)
        this.dom.addEventListener('animationend', end)
        
        if(this.music) Game.Music.play(this.music)
        Game.domRoot.appendChild(this.dom)
    }
}

export default Ani
