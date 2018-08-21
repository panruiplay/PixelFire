import Skill from './Skill'

class SkillShadow extends Skill {
    step = 0
    cd = 11
    
    constructor(block, Class, cd = 12){
        super(block)
        this.Class = Class
        this.cd = cd
        this.step = cd / 3 >> 0
    }
    
    action(block) {
        new this.Class().show(block.rect.centerX, block.rect.centerY)
    }
}

export {
    SkillShadow
}
