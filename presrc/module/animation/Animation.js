import './ani.scss'
import Game from '../Game'
import dom from '../../utils/dom'
import Music from '../music/Music'

let Animation = Base.extend({
    constructor(x = Game.centerX, y = Game.centerY, cb) {
        this.dom = dom.create('div', 'ani ' + this.cls)
        this.x = x - this.width / 2
        this.y = y - this.height / 2
        this.dom.style.cssText = `left: ${this.x}px; top: ${this.y}px;`

        dom.animationEnd(this.dom, () => {
            Game.container.removeChild(this.dom)
            this.dom = null
            cb && cb()
        })

        Game.container.appendChild(this.dom)
        this.music && Music.play(this.music)
    },

    dom: null,
    cls: '',
    music: '',
    x: null,
    y: null,
    width: 10,
    height: 10
})

export default Animation