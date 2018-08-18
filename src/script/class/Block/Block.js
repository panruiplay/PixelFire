import { createDom } from '../../utils'
import Game from '../Game'
import Chain from 'func-chain'
import Rect from '../Rect'

let pix = Math.PI / 180

/**
 * 方块类：屏幕上一个可参与碰撞的基本单位
 */
class Block {
    static baseClass = 'block-base'
    
    // 判断两个block是否碰撞
    static isCollision(rect1, rect2) {
        if(rect1.block.isDestroy || rect2.block.isDestroy) return false
        
        let b1x = rect1.x,
            b1y = rect1.y,
            b2x = rect2.x,
            b2y = rect2.y
        
        return !(
            b1y > rect2.height + b2y ||
            rect1.width + b1x < b2x ||
            rect1.height + b1y < b2y ||
            b1x > rect2.width + b2x
        )
    }
    
    // 撞击
    static collision(block1, block2) {
        let dead = [false, false]
        
        block1.hp -= block2.atk
        block2.hp -= block1.atk
        
        if(block1.hp <= 0) block1.destroy(), dead[0] = true
        if(block2.hp <= 0) block2.destroy(), dead[1] = true
        
        return dead
    }
    
    dom = null          // DOM对象
    rect = null         // 矩形对象
    className = ''      // 方块样式
    preAni = null       // 预警动画
    birthAni = null     // 出生动画
    birthMusic = null   // 出生音乐
    deathAni = null     // 死亡动画
    skill = []          // 技能
    decorators = []     // 装饰
    destroyEvt = []     // 死亡事件列表
    hp = 1              // 生命值
    atc = 10            // 攻击力
    isDestroy = false   // 是否已经死亡
    
    angle = 0           // 角度
    radian = 0          // 弧度
    speed = 0           // 速度
    vx = 0              // x轴移动速度
    vy = 0              // y轴移动速度
    
    constructor(centerX, centerY, width, height) {
        this.rect = Rect.centerCreate(centerX, centerY, width, height)
    }
    
    // 初始化
    init() {
        let r = this.rect
        this.rect.block = this
        this.dom = createDom('div', Block.baseClass + ' ' + this.className)
        this.dom.style.cssText = `left: ${r.x}px; top: ${r.y}px; width: ${r.width}px; height: ${r.height}px`
        
        this.skill = this.skill.map(v => {
            if(v instanceof Array) {
                let [constructor, ...args] = v
                return new constructor(this, ...args)
            } else {
                return new v(this)
            }
        })
        
        this.decorators.forEach(v => {
            if(v instanceof Array) {
                let [fn, ...args] = v
                fn(this, ...args)
            } else {
                v(this)
            }
        })
        
        this.decomposeSpeed()
        return this
    }
    
    // 在屏幕上显示
    birth = (hasAni = true, cb) => {
        // 如果还没有创建dom则自动init
        if(!this.dom) this.init()
        
        let that = this
        
        Chain()
        > function (next) {
            if(hasAni && that.preAni) {
                that.preAni.show(that.rect.centerX, that.rect.centerY, next)
            } else {
                next()
            }
        }
        > function () {
            if(hasAni && that.birthAni) that.birthAni.show(that.rect.centerX, that.rect.centerY)
            if(that.birthMusic) Game.Music.play(that.birthMusic)
            Game.domRoot.appendChild(that.dom)
            that.isDestroy = false
            cb && cb()
        }
        || Chain.go()
        
        return this
    }
    // 销毁
    destroy = (hasAni = true) => {
        this.isDestroy = true
        if(hasAni && this.deathAni) this.deathAni.show(this.rect.centerX, this.rect.centerY)
        Game.domRoot.removeChild(this.dom)
        this.destroyEvt.forEach(v => v())
    }
    // 行动（下一帧）
    next = () => {
        this.skill.forEach(v => v.next())
        this.rect.x += this.vx
        this.rect.y += this.vy
        this.rect.update()
        return this
    }
    // 更新显示效果
    update = () => {
        let rect = this.rect
        this.dom.style.left = `${rect.x}px`
        this.dom.style.top = `${rect.y}px`
        return this
    }
    // 死亡事件
    onDestroy = (fn) => {
        this.destroyEvt.push(fn)
        return this
    }
    
    // 速度设为0
    speedClear() {
        this.vx = 0
        this.vy = 0
        return this
    }
    // 设置角度
    setAngle(deg) {
        this.angle = deg
        this.radian = deg * pix
        this.decomposeSpeed()
        return this
    }
    // 设置弧度
    setRadian(radian) {
        this.radian = radian
        this.decomposeSpeed()
        return this
    }
    // 速度分解
    decomposeSpeed() {
        this.vx = Math.cos(this.radian) * this.speed
        this.vy = Math.sin(this.radian) * this.speed
        return this
    }
}

export default Block
