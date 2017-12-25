import utils from '../utils/utils'
import dom from '../utils/dom'
import Music from './music/Music'
import Panel from './panel/Panel'
import User from './block/User'
import Control from './control/Control'
import EnemyFactory from './block/enemy/EnemyFactory'
import Data from './Data'
import Block from './block/Block'

let Game = {
    container: dom.search('#container'),
    width: 1000,
    height: 600,
    centerX: 500,
    centerY: 300,
    user: null,     // 用户角色
    enemyList: [],  // 敌人列表
    friendList: [], // 己方列表【子弹等】
    tree: null,      // 四叉树

    // 关卡设置
    nowK: 1,
    nowItem: 0,

    // 关卡进度变量
    nowData: null, // 当前关卡所有数据
    time: -1,
    nextTime: 0,

    // 信息
    kInfo: [false, false, false],

    init(cb) {
        this.bindEvent()
        this.bindMusic()
        this.user = new User(500, 300, 0)
        this.tree = new QuadTree({ x: 0, y: 0, width: 1000, height: 600 }, 0, 10, 6)
        window.onresize()
        cb && cb()
    },
    bindEvent() {
        dom.on('#btn-start', 'click', function () {Panel.change('main')})
        dom.on('#btn-help', 'click', function () {Panel.change('help')})
        dom.on('#back-menu1', 'click', function () {Panel.change('menu')})
        dom.on('#back-menu2', 'click', function () {Panel.change('menu')})
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
        > cgo()
    })),
    /*-------------- 游戏流程 --------------*/
    GameStart() {
        let user = this.user,
            tree = this.tree

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
            // let Collisions = utils.unique(tree.retrieve(user))
            // for(let i = Collisions.length - 1; i >= 0; i--) {
            //     if(Block.isCollision(user, Collisions[i])) {
            //         user.destroy()
            //         return
            //     }
            // }

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

        user.init().birth(() => this.bgmOk.then(loop))
        this.bgmOk.then(Music.playBGM)
    },
    // 生成敌人
    createEnemy() {
        if(++this.time !== this.nextTime) return

        let item = Data['k' + this.nowK][this.nowItem]   // 当前数据

        if(!item) return

        let enemy    = item.enemy,
            after    = item.after,
            isString = item.enemy === item.enemy + '',
            result

        if(isString && enemy != '') {
            let x = item.x || utils.random(0, 980),
                y = item.y || utils.random(0, 580)

            result = EnemyFactory(enemy, x, y).init().birth(function () {
                Game.addEnemy(result)
            })
        } else if(typeof enemy == 'function') {
            result = enemy(EnemyFactory, Game.addEnemy)
        }

        if(after === +after) {
            this.time = 0
            this.nextTime = after
            this.nowItem++
            if(after == 0) {
                this.time = -1
                Game.createEnemy()
            }
        } else {
            after(result, () => {
                this.time = -1
                this.nextTime = 0
                this.nowItem++
            })
        }
    },
    // 添加敌人到游戏
    addEnemy(enemy) { this.enemyList.push(enemy) }
}

window.Game = Game
window.music = Music

export default utils.allBind(Game)