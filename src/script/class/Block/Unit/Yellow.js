import Block from '../Block'
import { BoomYellow } from '../../Animation/Boom'
import { SkillShadow } from '../../Skill/BlockShadow'
import { ShadowYellow } from '../../Animation/Shadow'
import { ShrinkYellow } from '../../Animation/Pre'
import Combination from '../Combination'

class Yellow extends Block {
    className = 'background-yellow' // 方块样式
    deathAni = new BoomYellow()
    hp = 20
    atk = 10
    
    skill = [[SkillShadow, ShadowYellow, 15]]
    decorators = []
    
    speed = 2
    
    constructor(x, y, angle = 0) {
        super(x, y, 12, 12)
        this.setAngle(angle)
    }
}

class Yellows extends Combination{
    static FactoryName = 'Yellow'
    
    constructor(x, y){
        super()
        this.x = x
        this.y = y
        this.arr = []
        for(let i = 0 ;i < 8; i++) this.arr.push(new Yellow(x, y, i * 45))
    }
    
    done(cb){
        new ShrinkYellow().show(this.x, this.y, () => {
            cb(this.arr)
        })
    }
}

export default Yellows
