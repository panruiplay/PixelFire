import utils from '../utils/utils'
import AnimationFactory from '@/module/animation/AnimationFactory'
import Game from '@/module/Game'

/**
 * x: 敌人的位置x [number] | null = 随机x坐标 | 'u' = 用户x坐标
 * y: 敌人的位置y [number] | null = 随机y坐标 | 'u' = 用户y坐标
 *
 * enemy: 生成的敌人  [string] = 要生成敌人的类型 | [function(enemyFactory, addEnemy)] 调用函数
 *
 * after:
 *     - [number]       在指定时间之后进入下一条数据
 *     - [function(???, cb)]
 *          如果enemy是string  则???传入的是敌人对象
 *          如果enemy是函数     则???是这个函数的返回结果，可以传递一些数据
 *          在函数中调用cb时进入下一条数据，cb中可以传入一个数，表示额外的延迟
 */

let data = {
    k1: [
        { enemy: '', after: 50 },
        { enemy: 'Red', after: 160 },
        { enemy: 'Red', after: 200 },
        { enemy: 'Red', after: 200 },
        { enemy: 'Red', after: 180 },
        { enemy: 'Red', x: 200, y: 100, after: 10 },
        { enemy: 'Red', x: 200, y: 150, after: 10 },
        { enemy: 'Red', x: 200, y: 200, after: 10 },
        { enemy: 'Red', x: 200, y: 250, after: 10 },
        { enemy: 'Red', x: 200, y: 300, after: 10 },    // 10
        { enemy: 'Red', x: 200, y: 350, after: 10 },
        { enemy: 'Red', x: 200, y: 400, after: 10 },
        { enemy: 'Red', x: 200, y: 450, after: 10 },
        { enemy: 'Red', x: 200, y: 500, after: 20 },
        { enemy: 'Red', x: 800, y: 100, after: 10 },
        { enemy: 'Red', x: 800, y: 150, after: 10 },
        { enemy: 'Red', x: 800, y: 200, after: 10 },
        { enemy: 'Red', x: 800, y: 250, after: 10 },
        { enemy: 'Red', x: 800, y: 300, after: 10 },
        { enemy: 'Red', x: 800, y: 350, after: 10 },    // 20
        { enemy: 'Red', x: 800, y: 400, after: 10 },
        { enemy: 'Red', x: 800, y: 450, after: 10 },
        { enemy: 'Red', x: 800, y: 500, after: afterThisEnemyDeath(30) },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 50 },
        { enemy: 'Speed', after: 50 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 0 },
        { enemy: 'Speed', after: 0 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: afterThisEnemyDeath(60) }
    ],
    k2: [
        { enemy: '', after: 40 },
        { enemy: 'Red', x: 'u', y: 'u', after: 0 },
        { enemy: 'Red', after: 0 },
        { enemy: 'Red', after: 100 },
        ...pRandom(Yellows, 3, 150),
        ...pRandom('Speed', 10, 35),
        { enemy: '', after: 200 },
        ...pRandom(Yellows.bind('u', 'u'), 5, 150),
        ...pRandom('Red', 10, 20),
        { enemy: '', after: 100 },
        ...pRandom(Yellows, 2),
        { enemy: '', after: 120 },
        { enemy: Yellows('u', 'u'), after: 150 },
        ...pRandom(Yellows, 2),
        { enemy: '', after: 120 },
        { enemy: Yellows('u', 'u'), after: 150 },
        { enemy: Yellows('u', 'u'), after: 150 },
        { enemy: Yellows('u', 'u'), after: afterTheseEnemyDeath(100) },
    ]
}

export default data

// 当这一个敌人死亡后time秒，下一个敌人刷新
function afterThisEnemyDeath(time) {
    return function (enemy, next) {
        enemy.onDeath = next.bind(null, time)
    }
}

// 这一批敌人死亡后
function afterTheseEnemyDeath(time) {
    return function (arr, next) {
        let total = arr.length, count = 0
        arr.forEach(v => v.onDeath = exit)
        console.log(arr)
        function exit() {
            if(++count === total) next(time)
            console.log(count)
            console.log(total)
        }
    }
}

/*/ -------------生成敌人类函数------------- /*/
// 黄色敌人
function Yellows(x = utils.random(0, 980), y = utils.random(0, 580)) {
    return function (factory, addEnemy) {
        if(x === 'u') x = Game.user.getCenter().x
        if(y === 'u') y = Game.user.getCenter().y
        
        let enemyArr = []
        for(let i = 0; i < 8; i++) {
            let enemy = factory('Yellow', x, y, i * 45)
            enemyArr.push(enemy)
        }
        
        AnimationFactory('ShrinkYellow', x, y, function () {
            enemyArr.forEach(v => v.init().birth(() => addEnemy(v)))
        })
        
        return enemyArr
    }
}

// 批量随机生成
function pRandom(type, num, next = 0) {
    let arr = []
    for(let i = 0; i < num; i++) {
        let obj = { enemy: type, after: next }
        if(typeof obj.enemy === 'function') obj.enemy = obj.enemy()
        arr.push(obj)
    }
    return arr
}