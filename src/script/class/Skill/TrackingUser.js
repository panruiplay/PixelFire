import Skill from './Skill'
import { pointDeg } from '../../math'
import Game from '../Game'

class TrackingUser extends Skill {
    step = 29
    cd = 30
    
    constructor(block, cd = 30, step = 29){
        super(block)
        this.setAttr(cd, step)
    }
    
    action(block ) {
        let { rect }           = block,
            { rect: userRect } = Game.user
        
        block.setAngle(pointDeg(rect.centerX, rect.centerY, userRect.centerX, userRect.centerY))
    }
}

export {
    TrackingUser
}
