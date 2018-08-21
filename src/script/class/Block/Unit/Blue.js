import Block from '../Block'
import { MarkBlue } from '../../Animation/Pre'
import { BoundsRebound } from '../decorators'
import { BoomBlue } from '../../Animation/Boom'
import { SpreadBlue } from '../../Animation/Spread'
import { TimeShooting } from '../../Skill/TimeShooting'

class Blue extends Block {
    static FactoryName = 'Blue'
    
    className = 'background-blue'
    preAni = new MarkBlue()
    birthAni = new SpreadBlue()
    deathAni = new BoomBlue()
    hp = 20
    atk = 10
    
    skill = [TimeShooting]
    decorators = [BoundsRebound]
    
    speed = 1
    
    constructor(x, y) {
        super(x, y, 10, 10)
        this.setAngle(60)
    }
}

export default Blue
