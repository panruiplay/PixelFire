import { createDom } from '../../utils'
import Game from '../Game'

/**
 * 瞄准指针
 */
class Pointer {
    static baseClass = 'pointer'
    
    dom = null      // dom元素
    block = null    // 所属
    angle = 0       // 角度
    targetX = 0     // 指向位置
    targetY = 0     // 指向位置
    className = ''  // 样式
    
    constructor(block, className) {
        this.block = block
        this.className = className
    }
    
    init() {
        let r = this.block.rect
        this.dom = createDom('div', Pointer.baseClass + ' ' + this.className)
        this.dom.style.cssText = `left: ${r.centerX}px; top: ${r.centerY}px;`
    }
    birth() {
        Game.domRoot.appendChild(this.dom)
    }
    destroy() {
        Game.domRoot.removeChild(this.dom)
    }
    // 设置指向目标
    setTarget(x, y) {
    
    }
    // 更新显示
    update() {
        let r = this.block.rect
        this.dom.style.cssText = `left: ${r.centerX}px; top: ${r.centerY}px; transform: translateY(-50%) rotate(${this.angle}deg)`
    }
}

export default Pointer
