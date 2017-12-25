import Animation from './Animation'
import Factory from './AnimationFactory'
import Game from '../Game'

// 用户出生
let UserBirth = Animation.extend({
    constructor(x = Game.centerX, y = Game.centerY, cb) {
        let count = 0, over = 0

        function go() {
            Factory('ShrinkGreen', x, y, exit)
            if(++count < 4) setTimeout(go, 100)
        }
        go()

        function exit() { if(++over >= 4) cb && cb() }
    }
})

// 火花爆炸
let SparkExplosion = Animation.extend({
    constructor(x = Game.centerX, y = Game.centerY, cb) {
        let count = 0

        function exit() { if(++count >= 5) cb && cb() }

        Factory('SpreadRed', x, y, exit)
        Factory('SpreadGreen', x, y, exit)
        Factory('BoomSpeed', x, y, exit)
        Factory('BoomYellow', x, y, exit)
        Factory('BoomBlue', x, y, exit)
    }
})

export default { UserBirth, SparkExplosion }