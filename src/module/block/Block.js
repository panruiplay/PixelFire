import './block.scss'

import Game from '@/module/Game'
import Music from '@/module/music/Music'
import utils from '../../utils/utils'
import Chain from 'func-chain'
import dom from '../../utils/dom'
import AnimationFactory from '../animation/AnimationFactory'

let pix = Math.PI / 180

export default Base.extend({
    constructor(x = utils.random(0, 980), y = utils.random(0, 580), angle = utils.randomAngle()) {
        this.x = x
        this.y = y
        
        let skillTmp = []
        this.skills.forEach(v => skillTmp.push(new v(this)))
        this.skills = skillTmp
        this.setAngle(angle)
    },
    
    dom: null,          // 绑定的DOM元素
    cls: '',            // 样式
    beforeAni: '',      // 出生前动画
    birthMusic: null,   // 出生音乐
    birthAni: '',       // 出生动画
    deathAni: null,     // 死亡动画
    onDeath: null,      // 死亡回调
    skills: [],         // 所有技能
    hp: 10,             // 生命值
    x: 500,             // x坐标
    y: 300,             // y坐标
    radian: 0,          // 弧度
    speed: 2,           // 速度
    vx: 0,              // x速度
    vy: 0,              // y速度
    length: 10,         // 长度
    isDestroy: false,   // 是否销毁
    afterMovePlugin: [],   // 位置移动之后的插件
    afterUpdatePlugin: [], // update之后的插件
    
    // 四叉树辅助用
    width: 10,
    height: 10,
    
    // 初始化
    init() {
        this.isDestroy = false
        let tmp        = this.length >> 1
        this.dom       = dom.create('div', `block${this.length} ${this.cls}`)
        this.x -= tmp
        this.y -= tmp
        this.update()
        return this
    },
    // 插入HTML中
    birth(cb) {
        let { x, y } = this.getCenter()
        
        Chain()
        
        // 没有出生前动画则跳过
        > function (next) {
            this.beforeAni || next.skip(1)
            next()
        }.bind(this)
        
        // 出生前动画
        > AnimationFactory.args(this.beforeAni, x, y)
        
        // 出生动画
        > function (next) {
            // 出生动画
            this.birthAni && AnimationFactory(this.birthAni, x, y)
            // 出生音乐
            this.birthMusic && Music.play(this.birthMusic)
            
            Game.container.appendChild(this.dom)
            cb && cb()
            next()
        }.bind(this)
        
        || Chain.go()
        return this
    },
    // 显示
    show() {
        dom.show(this.dom)
        return this
    },
    // 隐藏
    hide() {
        dom.hide(this.dom)
        return this
    },
    // 下一帧的状态
    nextState() {
        this.x += this.vx
        this.y += this.vy
        this.afterMovePlugin.forEach(v => v.call(this))
        this.skills.forEach(v => v.step())
        return this.update()
    },
    // 更新显示效果
    update() {
        this.dom.style.cssText = `left: ${this.x}px; top: ${this.y}px;`
        this.afterUpdatePlugin.forEach(v => v.call(this))
        return this
    },
    // 销毁，死亡
    destroy() {
        let center = this.getCenter()
        this.deathAni && AnimationFactory(this.deathAni, center.x, center.y)
        Game.container.removeChild(this.dom)
        this.isDestroy = true
        this.dom       = null
        this.onDeath && this.onDeath()
        return this
    },
    // 设置角度
    setAngle(deg) {
        this.angle  = deg
        this.radian = deg * pix
        this.decomposeSpeed()
    },
    // 设置弧度
    setRadian(radian) {
        this.radian = radian
        this.decomposeSpeed()
    },
    // 速度分解
    decomposeSpeed() {
        this.vx = Math.cos(this.radian) * this.speed
        this.vy = Math.sin(this.radian) * this.speed
    },
    // 取得中心点
    getCenter() {
        let tmp = this.length >> 1
        return { x: this.x + tmp, y: this.y + tmp }
    }
}, {
    // 判断两个物体是否碰撞
    isCollision(block1, block2) {
        let len1 = block1.length,
            len2 = block2.length,
            b1x  = block1.x,
            b1y  = block1.y,
            b2x  = block2.x,
            b2y  = block2.y
        
        return !(b1y > len2 + b2y || len1 + b1x < b2x || len1 + b1y < b2y || b1x > len2 + b2x)
        
    },
    // 撞击
    collision(block1, block2) {
        if(block1.isDestroy || block2.isDestroy) return
        
        let tmp = block1.hp
        block1.hp -= block2.hp
        block2.hp -= tmp
        
        if(block1.hp <= 0) block1.destroy()
        if(block2.hp <= 0) block2.destroy()
    }
})