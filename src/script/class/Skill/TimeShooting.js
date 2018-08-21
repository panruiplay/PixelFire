import Skill from './Skill'
import { pointDeg } from '../../math'
import Game from '../Game'
import SmallBlue from '../Block/Unit/SmallBlue'

class TimeShooting extends Skill {
    step = 0
    cd = 10
    count = 0
    sumCount = 0
    
    constructor(block, range = 45, line = 3) {
        super(block)
        this.range = range
        this.line = line
    }
    
    action(block) {
        let { rect }           = block,
            { rect: userRect } = Game.user,
            { range, line }    = this
        
        let deg   = pointDeg(rect.centerX, rect.centerY, userRect.centerX, userRect.centerY),
            start = deg - range / 2,
            add   = range / line
        
        for(let i = 0; i < line; i++) {
            let s = new SmallBlue(rect.centerX, rect.centerY)
            s.setAngle(start + add * i)
            s.init().birth(false, () => {
                Game.enemyGroup.push(s)
            })
        }
        
        this.count++
        this.sumCount++
        if(this.sumCount % 3 == 0){
            this.range = Math.min(90, range + 15)
            this.line = Math.min(6, line + 1)
        }
        if(this.count >= 3) return this.cd = 120, this.count = 0
        if(this.cd == 120) this.cd = 10, this.count = 1
    }
}

export {
    TimeShooting
}
