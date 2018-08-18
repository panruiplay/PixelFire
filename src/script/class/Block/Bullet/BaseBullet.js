import Block from '../Block'
import { directionExpansion } from '../decorators'

class BaseBullet extends Block {
    className = 'san1'
    birthMusic = 'fire1'
    decorators = [[directionExpansion, 45]]
    speed = 5.5
    hp = 1
    atk = 10
    
    constructor(x, y) {
        super(x, y, 10, 10)
    }
}

export default BaseBullet
