import Block from '../Block'
import { BoomSBlue } from '../../Animation/Boom'

class SmallBlue extends Block {
    static FactoryName = 'SmallBlue'
    
    className = 'small-blue'
    deathAni = new BoomSBlue()
    hp = 5
    atk = 5
    speed = 3
    
    constructor(x, y) {
        super(x, y, 8, 8)
    }
}

export default SmallBlue
