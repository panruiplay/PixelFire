import Block from '../Block'
import { ShrinkOrange } from '../../Animation/Pre'
import { BoomOrange } from '../../Animation/Boom'
import { SkillShadow } from '../../Skill/BlockShadow'
import { TrackingUser } from '../../Skill/TrackingUser'
import { ShadowOrange } from '../../Animation/Shadow'

class Orange extends Block {
    static FactoryName = 'Orange'
    
    className = 'background-orange'    // 方块样式
    preAni = new ShrinkOrange()
    deathAni = new BoomOrange()        // 死亡动画
    hp = 10
    atk = 10
    
    skill = [[SkillShadow, ShadowOrange, 9], [TrackingUser, 50, 49]]
    decorators = []
    
    speed = 3.5
    
    constructor(x, y) {
        super(x, y, 8, 8)
    }
}

export default Orange
