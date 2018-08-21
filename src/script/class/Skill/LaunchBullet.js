import Skill from './Skill'
import Game from '../Game'

// 用户专用
class LaunchBullet extends Skill {
    step = 0
    cd = 14
    
    constructor(block, bulletClass) {
        super(block)
        this.bulletClass = bulletClass
    }
    
    action(block) {
        let { pointer }        = block,
            { rect: userRect } = Game.user

        let bullet = new this.bulletClass(userRect.centerX, userRect.centerY)
        
        bullet.init().birth(false, () => {
            bullet.setAngle(pointer.angle || 0)
            Game.userGroup.push(bullet)
        })
    }
}

export {
    LaunchBullet
}
