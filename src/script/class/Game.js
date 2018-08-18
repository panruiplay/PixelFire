import UI from './UI'
import { $, addEventLock, addEventOnce } from '../utils'
import Music from './Music'
import Chain from 'func-chain'
import Rect from './Rect'
import Green from './Block/Unit/Green'
import Control from './Control'
import { pointerExpansion } from './Block/decorators'
import { pointDeg } from '../math'
import UnitFactory from './Block/Unit/Factory'
import Data from '../Data/index'
import QuadTree from './QuadTree'
import Block from './Block/Block'

class Game {
    width = 1000
    height = 600
    centerX = 500
    centerY = 300
    domRoot = $('.root')      // DOM根节点对象
    user = null               // 用户角色
    
    userGroup = []            // 用户组block
    enemyGroup = []           // 敌方组block
    bounds = new Rect(0, 0, this.width, this.height)
    enemyGroupQuadTree = new QuadTree(this.bounds)
    
    // 初始化
    init() {
        this.UI = new UI()
        this.Music = new Music()
        this.Control = new Control()
        
        this.Music.loadMusic(() => {
            this.UI.change('intoGame')
            addEventOnce('#intoBtn', 'click', () => {
                this.UI.change('menu')
                setTimeout(() => {
                    this.Music.playBgm('bgm_main')
                }, 700)
            })
            
            // this.Music.playBgm('bgm_main')
            // this.UI.change('menu')
        })
        
        // 用户单位
        this.user = new Green(this.centerX, this.centerY).speedClear()
        pointerExpansion(this.user, 's1')
        
        // 注册基本按钮事件
        this.eventBase()
        // 注册用户角色方向键控制
        this.userControl()
        
        let a = { x: 1, y: 2 },
            s = Date.now()
        
        for(let i = 0; i < 1000000; i++) {
            a.x, a.y, a.x, a.y
        }
        
        console.log(Date.now() - s)
    }
    
    // 基本按钮事件
    eventBase() {
        // 开始游戏
        addEventLock('#btn-start', 'click', (e, unLock) => {
            setTimeout(unLock, 1000)
            this.startGame()
        })
    }
    
    // 用户键控
    userControl() {
        this.Control.disableDirectionKey()
        this.Control.onDirChange((count, dir) => {
            if(count) {
                this.user.setAngle(dir)
            } else {
                this.user.speedClear()
            }
        })
        
        this.Control.disableMouse = true
    }
    
    //--------------------------//
    
    // 开始游戏(关卡)
    startGame(k = 1) {
        let { user, Control: control, UI: ui, Music: music, userGroup, enemyGroup } = this,
            { width, height }                                                       = this,
            data                                                                    = Data['k' + k],
            time                                                                    = 0
        
        Chain()
        > ui.hide
        > function (next) {     // 音乐切换
            music.playBgm('bgm_bat')
            next()
        }
        > user.birth.args(true)
        > function () {         // 打开用户控制
            control.enableDirectionKey()
            control.disableMouse = false
            userGroup.push(user)
            requestAnimationFrame(loop)
        }
        || Chain.go()
        
        let createEnemy = (time) => {
            let tmp = []
            for(let i = data.length - 1; i >= 0; i--) {
                let v = data[i]
                if(v.createTime && time >= v.createTime) {
                    let enemy = UnitFactory(v.enemy, v.x || this.randomX(), v.y || this.randomY())
                    enemy.init().birth(true, () => enemyGroup.push(enemy))
                    continue
                }
                tmp.push(v)
            }
            data = tmp
        }
        
        let loop = () => {
            let { centerX, centerY } = user.rect
            let { userGroup, enemyGroup } = this
            let enemyGroupQuadTree = new QuadTree(this.bounds)
            
            // 生产敌人
            createEnemy(time)
            
            // 敌人行动
            for(let i = enemyGroup.length - 1; i >= 0; i--) {
                let enemy    = enemyGroup[i],
                    { rect } = enemy
                
                // 如果已经死亡
                if(enemy.isDestroy) {
                    enemyGroup.splice(i, 1)
                    continue
                }
                
                // 杀死所有超出边界的单位
                if(rect.x > width || rect.y > height || rect.x + rect.width < 0 || rect.y + rect.height < 0) {
                    enemy.destroy(false)
                    enemyGroup.splice(i, 1)
                    continue
                }
                
                enemy.next().update()
                enemyGroupQuadTree.insert(rect)
            }
            // 用户行动 碰撞：用户组所有单位与敌人组进行碰撞检测
            for(let i = userGroup.length - 1; i >= 0; i--) {
                let friend   = userGroup[i],
                    { rect } = friend
                
                // 如果已经死亡
                if(friend.isDestroy) {
                    userGroup.splice(i, 1)
                    continue
                }
                // 杀死所有超出边界的单位
                if(rect.x > width || rect.y > height || rect.x + rect.width < 0 || rect.y + rect.height < 0) {
                    friend.destroy(false)
                    userGroup.splice(i, 1)
                    continue
                }
                
                friend.next().update()
                
                let arr = enemyGroupQuadTree.retrieve(friend.rect)
                
                for(let j = arr.length - 1; j >= 0; j--) {
                    let enemyRect = arr[j]
                    // 如果发生的碰撞
                    if(Block.isCollision(enemyRect, friend.rect)) {
                        Block.collision(enemyRect.block, friend)
                    }
                }
            }
    
            // 用户指针更新
            user.pointer.angle = pointDeg(centerX, centerY, control.mouseX, control.mouseY)
            
            time++
            requestAnimationFrame(loop)
        }
    }
    
    //--------------------------//
    randomX() {
        return Math.random() * this.width >> 0
    }
    randomY() {
        return Math.random() * this.height >> 0
    }
}

export default new Game()
