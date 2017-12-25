import Skill from './Skill'
import Game from '../Game'

function skill(cb) {
    let userCenter = Game.user.getCenter(),
        center     = this.holder.getCenter()

    this.holder.setRadian(Math.atan2(userCenter.y - center.y, userCenter.x - center.x))

    cb()
}

export default Skill.extend({
    constructor(cd = 10, holder) {
        this.base(holder)
        this.fn = skill
        this.cd = cd
        this.nowStep = cd
    },
    nowStep: 10,
    cd: 10
})