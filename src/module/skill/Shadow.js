import Skill from './Skill'
import AnimationFactory from '../animation/AnimationFactory'

function skill(cb) {
    let center = this.holder.getCenter()
    AnimationFactory(this.ani, center.x, center.y)
    cb()
}

export default Skill.extend({
    constructor(ani = 'ShadowRed', cd = 5, first = cd, holder) {
        this.base(holder)
        this.fn = skill
        this.ani = ani
        this.cd = cd
        this.nowStep = first
    },
    nowStep: 10,
    cd: 10
})