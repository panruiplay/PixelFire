import Skill from './Skill'
import Bullet from '../block/Bullet'
import Game from '../Game'

function fire(cb) {
    let holder = this.holder,
        center = holder.getCenter()

    let bullet = new Bullet(center.x, center.y, holder.sightAngle).init().birth()
    Game.friendList.push(bullet)
    cb()
}

export default Skill.extend({
    constructor(holder) {
        this.base(holder)
        this.fn = fire
    },
    nowStep: 0,
    cd: 13
})