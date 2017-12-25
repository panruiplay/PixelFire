/**
 * x: 敌人的位置x [number] | null = 随机x坐标
 * y: 敌人的位置y [number] | null = 随机y坐标
 *
 * enemy: 生成的敌人  [string] = 要生成敌人的类型 | [function(enemyFactory, addEnemy)] 调用函数
 *
 * after:
 *     - [number]       在指定时间之后进入下一条数据
 *     - [function(???, cb)]
 *          如果enemy是string  则???传入的是敌人对象
 *          如果enemy是函数     则???是这个函数的返回结果，可以传递一些数据
 *          在函数中调用cb时进入下一条数据
 */

export default {
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
        { enemy: 'Red', x: 200, y: 300, after: 10 },
        { enemy: 'Red', x: 200, y: 350, after: 10 },
        { enemy: 'Red', x: 200, y: 400, after: 10 },
        { enemy: 'Red', x: 200, y: 450, after: 10 },
        { enemy: 'Red', x: 200, y: 500, after: 20 },
        { enemy: 'Red', x: 800, y: 100, after: 10 },
        { enemy: 'Red', x: 800, y: 150, after: 10 },
        { enemy: 'Red', x: 800, y: 200, after: 10 },
        { enemy: 'Red', x: 800, y: 250, after: 10 },
        { enemy: 'Red', x: 800, y: 300, after: 10 },
        { enemy: 'Red', x: 800, y: 350, after: 10 },
        { enemy: 'Red', x: 800, y: 400, after: 10 },
        { enemy: 'Red', x: 800, y: 450, after: 10 },
        { enemy: 'Red', x: 800, y: 500, after: 600 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 100 },
        { enemy: 'Speed', after: 0 },
        { enemy: 'Speed', after: 0 },
        { enemy: 'Speed', after: 0 },
        { enemy: 'Speed', after: 150 },
        { enemy: 'Speed', after: 150 },
        { enemy: 'Speed', after: 150 },
        { enemy: 'Speed', after: 150 }
    ]
}