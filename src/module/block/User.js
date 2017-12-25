import Block from './Block'
import dom from '../../utils/dom'
import Control from '../control/Control'
import Game from '../Game'
import UserFire from '../skill/UserFire'
import { Boundary1 } from './plugin'

let { atan2 } = Math, tmp2 = 180 / Math.PI
let pointDeg = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1) * tmp2

export default Block.extend({
    cls: 'user',
    beforeAni: 'UserBirth',
    birthAni: 'SpreadGreen',
    deathAni: 'BoomGreen',
    hp: 10,
    speed: 0,
    reSpeed: 2,
    length: 10,
    skills: [UserFire],
    // 射击指针
    sightDom: null,
    sightCls: 's1',
    sightAngle: 0,
    afterMovePlugin:[Boundary1],

    init() {
        this.sightDom = dom.create('div', this.sightCls)
        this.setSightAngle()
        return this.base()
    },
    nextState() {
        this.setSightAngle()
        if(!this.speed) { this.vx = this.vy = 0 }
        return this.base()
    },
    update() {
        let tmp = this.getCenter()
        this.sightDom.style.cssText = `left: ${tmp.x}px; top: ${tmp.y}px; transform: rotate(${this.sightAngle}deg)`
        return this.base()
    },
    birth(cb) {
        this.base(() => {
            Game.container.appendChild(this.sightDom)
            cb && cb()
        })
        return this
    },
    destroy(){
        Game.container.removeChild(this.sightDom)
        this.sightDom = null
        return this.base()
    },
    setSightAngle() {
        let tmp = this.getCenter()
        this.sightAngle = pointDeg(tmp.x, tmp.y, Control.mouseX, Control.mouseY)
    }
})