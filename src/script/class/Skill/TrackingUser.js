import Skill from './Skill'
import { pointDeg } from '../../math'
import Game from '../Game'

class TrackingUser extends Skill {
    step = 29
    cd = 30
    
    action(block) {
        let { rect }           = block,
            { rect: userRect } = Game.user
        
        block.setAngle(pointDeg(rect.centerX, rect.centerY, userRect.centerX, userRect.centerY))
    }
}

export {
    TrackingUser
}
