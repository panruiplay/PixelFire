import Block from '../Block'
import { ShrinkRed } from '../../Animation/Shrink'
import { SpreadRed } from '../../Animation/Spread'
import { BoomRed } from '../../Animation/Boom'
import { SkillShadowRed } from '../../Skill/BlockShadow'
import { TrackingUser } from '../../Skill/TrackingUser'

class Red extends Block {
    static FactoryName = 'Red'

    className = 'background-red'    // 方块样式
    preAni = new ShrinkRed()        // 预警动画
    birthAni = new SpreadRed()      // 出生动画
    deathAni = new BoomRed()        // 死亡动画
    hp = 20
    atk = 10
    
    skill = [SkillShadowRed, TrackingUser]
    decorators = []
    
    speed = 1.5
    angle = 0
    
    constructor(x, y) {
        super(x, y, 10, 10)
    }
}

export default Red
