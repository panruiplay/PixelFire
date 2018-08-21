/**
 * 技能类：
 * 方块每行动一帧，step加一
 * 当进step=cd时使用技能，重置step
 */
class Skill {
    step = 0
    cd = 0
    block = null
    
    constructor(block) {
        this.block = block
    }
    
    // 设置属性
    setAttr(cd, step) {
        this.step = step
        this.cd = cd
    }
    // 下一帧
    next() {
        this.step++
        if(this.step == this.cd) {
            this.step = 0
            this.action(this.block)
        }
    }
    
    // 具体操作
    action(block) {
    
    }
}

export default Skill
