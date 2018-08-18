import Skill from './Skill'
import { ShadowRed } from '../Animation/Shadow'

class SkillShadowRed extends Skill {
    step = 0
    cd = 11
    
    action(block) {
        new ShadowRed().show(block.rect.centerX, block.rect.centerY)
    }
}

export {
    SkillShadowRed
}
