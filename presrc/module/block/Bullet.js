import Block from './Block'
import { Boundary2 } from './plugin'

export default Block.extend({
    length: 8,
    // 四叉树辅助用
    width: 8,
    height: 8,
    birthMusic: 'fire1',
    cls: 'san1',
    angle: 0,
    speed: 8,
    afterUpdatePlugin: [Boundary2],

    update() {
        this.dom.style.cssText = `left: ${this.x}px; top: ${this.y}px; transform: rotate(${this.angle + 45}deg)`
        this.afterUpdatePlugin.forEach(v => v.call(this))
        return this
    }
})