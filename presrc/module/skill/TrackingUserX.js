import Skill from './Skill'
import Game from '../Game'

function skill(cb) {
    let userCenter = Game.user.getCenter(),
        holder     = this.holder,
        center     = holder.getCenter(),
        disX       = userCenter.x - center.x,
        disY       = userCenter.y - center.y
    
    holder.ax = disX * 0.002
    holder.ay = disY * 0.002
    
    holder.vx += holder.ax
    holder.vy += holder.ay
    
    cb()
}

export default Skill.extend({
    constructor(cd = 10, holder) {
        this.base(holder)
        this.fn      = skill
        this.cd      = cd
        this.nowStep = cd
    },
    nowStep: 10,
    cd: 10
})