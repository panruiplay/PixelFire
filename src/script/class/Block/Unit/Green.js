import { ShrinkGreedM } from '../../Animation/Shrink'
import { BoomGreen } from '../../Animation/Boom'
import { SpreadGreen } from '../../Animation/Spread'
import Block from '../Block'
import { LaunchBullet } from '../../Skill/LaunchBullet'
import BaseBullet from '../Bullet/BaseBullet'
import { BoundsLimit } from '../decorators'

class Green extends Block {
    static FactoryName = 'Green'
    
    className = 'background-green'    // 方块样式
    preAni = new ShrinkGreedM()        // 预警动画
    birthAni = new SpreadGreen()    // 出生动画
    deathAni = new BoomGreen()      // 死亡动画
    hp = 10
    atk = 10
    
    decorators = [BoundsLimit]
    
    skill = [[LaunchBullet, BaseBullet, 'user']]
    
    speed = 2
    angle = 0
    constructor(x, y) {
        super(x, y, 10, 10)
    }
}

export default Green
