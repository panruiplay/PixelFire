import Pointer from './Pointer'
import Game from '../Game'

/* 类装饰 */
// block的显示样式会根据自身angle属性进行旋转
export function directionExpansion(block, angleFix = 0) {
    let _update = block.update
    block.update = () => {
        block.dom.style.transform = `rotate(${block.angle + angleFix}deg)`
        _update.call(block)
    }
}
// 边界限制，方法不可以超出边界
export function BoundsLimit(block) {
    let _next = block.next
    block.next = () => {
        _next.call(block)
        let is                = false,
            rect              = block.rect,
            { width, height } = Game.bounds
        
        if(rect.x < 0) rect.x = 0, is = true
        if(rect.x + rect.width > width) rect.x = width - rect.width, is = true
        if(rect.y + rect.height > height) rect.y = height - rect.height, is = true
        if(rect.y < 0) rect.y = 0, is = true
        
        if(is) rect.update()
    }
}

/* 实例装饰 */
// block添加指针
export function pointerExpansion(block, className) {
    block.pointer = new Pointer(block, className)
    
    let _init = block.init
    block.init = () => {
        block.pointer.init()
        _init.call(block)
    }
    
    let _birth = block.birth
    block.birth = (hasAni = true, cb) => {
        let _cb = cb
        
        _birth.call(block, hasAni, () => {
            block.pointer.birth()
            _cb && _cb()
        })
    }
    
    let _update = block.update
    block.update = () => {
        block.pointer.update()
        _update.call(block)
    }
    
    let _destroy = block.destroy
    block.destroy = () => {
        block.pointer.destroy()
        _destroy.call(block)
    }
}
