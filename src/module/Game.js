import utils from '../utils/utils'
import dom from '../utils/dom'
import Music from './music/Music'
import Panel from './panel/Panel'
import User from './block/User'
import Control from './control/Control'
import EnemyFactory from './block/enemy/EnemyFactory'
import Data from './Data'
import Block from './block/Block'
import Chain from 'func-chain'
import AnimationFactory from '@/module/animation/AnimationFactory'

let Game = {
    container: dom.search('#container'),
    width: 1000,
    height: 600,
    centerX: 500,
    centerY: 300,
    user: null,     // 用户角色
    enemyList: [],  // 敌人列表
    friendList: [], // 己方列表【子弹等】
    tree: null,     // 四叉树
    
    // 关卡设置
    nowK: 1,
    nowItem: 0,
    
    // 关卡进度变量
    time: -1,
    nextTime: 0,
    
    // 信息
    kInfo: [false, false, false],
    
    init(cb) {
        Chain()
        > Music.init
        > Panel.init
        > Control.init
        > function (next) {
            // 切换到主菜单
            Panel.change('menu')
            // 播放背景音乐
            Music.playBGM()
            // 初始化事件
            this.bindEvent()
            // 初始化音乐
            this.bindMusic()
            // 创建四叉树
            this.user = new User(500, 300, 0)
            this.tree = new QuadTree({ x: 0, y: 0, width: 1000, height: 600 }, 0, 10, 6)
            // 下一步
            next()
            cb && cb()
        }.bind(this)
        || Chain.go()
    },
    bindEvent() {
        dom.on('#btn-start', 'click', function () {Panel.change('main')})
        dom.on('#btn-help', 'click', function () {Panel.change('help')})
        dom.on('#back-menu1', 'click', function () {Panel.change('menu')})
        dom.on('#back-menu2', 'click', function () {Panel.change('menu')})
        
        dom.on('#k-select', 'click', (e) => {
            let target = e.target
            if(target.tagName.toLowerCase() === 'span') {
                this.setK(+target.innerHTML)
                this.GameStart()
            }
        })
        
        Control.onDirChange = this.onDirChange
    },
    bindMusic() {
        Array.from(dom.searchAll('.menu li')).forEach(v => {
            dom.on(v, 'click', function () {Music.play('click') })
        })
    },
    /*-------------- 按键事件 --------------*/
    onDirChange(count, dir) {
        let user = this.user
        if(count !== 0) {
            user.speed = user.reSpeed
            user.setAngle(dir)
            return this
        }
        user.speed = 0
    },
    
    /*-------------- 按钮动作 --------------*/
    // 开始游戏
    start: utils.lock(unlock => (function () {
        Game.bgmOk = new Promise(resolve => Music.changeBGM('bat', resolve))
        
        Chain()
        > Panel.hide.args('menu')
        > function (cb) {unlock() || cb()}
        > Game.GameStart
        || Chain.go()
    })),
    /*-------------- 游戏流程 --------------*/
    // 设置关卡
    setK(value) {
        this.nowK     = value
        this.time     = -1
        this.nextTime = 0
        this.nowItem  = 35
    },
    // 下一关
    nextK() {
        new Chain(
            AnimationFactory.args('Interlude', 500, 300, 'Round ' + (this.nowK + 1)),
            AnimationFactory.args('Interlude2Comb', 500, 300),
            function () {
                this.setK(this.nowK + 1)
            }.bind(this)
        ).go()
    },
    // 游戏开始
    GameStart() {
        // 删除Test
        try{
            document.querySelector('body').removeChild(document.querySelector('.fz'))
        }catch (e){}
        
        let user = this.user,
            tree = this.tree
        
        this.enemyList  = []
        this.friendList = []
        
        function loop() {
            // 生成敌人
            this.createEnemy()
            tree.clear()
            
            // 敌方行动
            let enemy = this.enemyList
            for(let i = enemy.length - 1; i >= 0; i--) {
                let obj = enemy[i]
                if(obj.isDestroy) {
                    enemy.splice(i, 1)
                } else {
                    obj.nextState()
                    tree.insert(obj)
                }
            }
            
            // 用户行动
            user.nextState()
            // 用户碰撞
            let Collisions = utils.unique(tree.retrieve(user))
            for(let i = Collisions.length - 1; i >= 0; i--) {
                if(Block.isCollision(user, Collisions[i])) {
                    return this.userDeath()
                }
            }
            
            // 友方【子弹】行动
            let friend = this.friendList
            for(let i = friend.length - 1; i >= 0; i--) {
                let obj = friend[i]
                if(obj.isDestroy) {
                    friend.splice(i, 1)
                } else {
                    obj.nextState()
                    // 子弹碰撞
                    let Collisions = utils.unique(tree.retrieve(obj))
                    for(let i = Collisions.length - 1; i >= 0; i--) {
                        Block.isCollision(obj, Collisions[i]) && Block.collision(obj, Collisions[i])
                    }
                }
                
            }
            
            requestAnimationFrame(loop)
        }
        loop = loop.bind(this)
        
        // 切换到战斗音乐
        Music.changeBGM('bat')
        
        // 路线1，切换面板 => 如果背景音乐加载完成，开始游戏，否则切换到路线2
        Chain()
        > Panel.hide.args(undefined)
        
        // 判断音乐是否准备就绪
        > function (next) {
            console.log(Music.bgmOk)
            // 准备就绪直接开始游戏循环
            if(Music.bgmOk) next.skip(1)
            next()
        }
        
        // 还没准备就绪
        > function (next) {
            // noinspection JSUnresolvedVariable
            Panel.loading.querySelector('.box').innerHTML = '加载音乐'
            
            Chain()
            > Panel.show.args('loading')
            > function (next2) {
                Music.bgmPro.then(next2)
            }
            > Panel.hide.args(undefined)
            > next
            || Chain.go()
        }
        
        // 开始游戏循环
        > function (next) {
            Music.playBGM()
            Control.enableDirectionKey()
            // 用户初始化
            user.x = Game.centerX
            user.y = Game.centerY
            user.init().birth(() => {
                loop()
                next()
            })
        }
        
        || Chain.go()
    },
    // 生成敌人
    createEnemy() {
        if(++this.time !== this.nextTime) return
        
        let item = Data['k' + this.nowK][this.nowItem]   // 当前数据
        
        // 没有下一条数据了,进入下一关
        if(!item) {
            return this.nextK()
        }
        
        let enemy    = item.enemy,
            after    = item.after,
            isString = item.enemy === item.enemy + '',
            result
        
        if(isString && enemy != '') {
            // 数据中enemy是字符串
            let x = item.x || utils.random(0, 980),
                y = item.y || utils.random(0, 580)
            
            if(x === 'u') x = this.user.getCenter().x
            if(y === 'u') y = this.user.getCenter().y
            
            result = EnemyFactory(enemy, x, y).init().birth(function () {
                Game.addEnemy(result)
            })
        } else if(typeof enemy == 'function') {
            // 数据中enemy是函数
            result = enemy(EnemyFactory, Game.addEnemy)
        }
        
        if(after === +after) {
            // 数据中after是数值（时间值）
            this.time     = 0
            this.nextTime = after
            this.nowItem++
            if(after == 0) {
                this.time = -1
                Game.createEnemy()
            }
        } else {
            // 数据中after是函数
            after(result, (delay = 0) => {
                this.time     = -1
                this.nextTime = delay
                this.nowItem++
            })
        }
    },
    // 添加敌人到游戏中
    addEnemy(enemy) { this.enemyList.push(enemy) },
    // 角色死亡
    userDeath() {
        this.user.destroy()
        Control.disableDirectionKey()
        
        let chain = new Chain()
        
        utils.wait(1100, () => {
            Array().concat(this.enemyList, this.friendList).forEach(v => {
                if(!v.isDestroy) {
                    chain.add(
                        function (next) {
                            utils.wait(60, next)
                            v.destroy()
                        }
                    )
                }
            })
            
            // 回到主面板
            chain.add(
                utils.wait.args(1500),
                Panel.show.args('menu'),
                Music.changeBGM.args('main'),
                Music.playBGM
            )
            
            chain.go()
        })
    }
}

export default utils.allBind(Game)