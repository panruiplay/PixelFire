import Animation from './Animation'
import Game from '@/module/Game'

let Interlude      = Animation.extend({
    constructor(x = Game.centerX, y = Game.centerY, content, cb) {
        this.base(x, y, cb)
        this.dom.innerHTML = content
    },
    width: 500,
    height: 200,
    cls: 'interlude'
})
let Interlude2     = Animation.extend({
    width: 250,
    height: 150,
    cls: 'interlude2'
})
let Interlude2Comb = Animation.extend({
    constructor(x = Game.centerX, y = Game.centerY, cb) {
        let count = 0, over = 0
        
        function go() {
            new Interlude2(x, y, exit)
            if(++count < 4) setTimeout(go, 100)
        }
        go()
        
        function exit() { if(++over >= 4) cb && cb() }
    }
})

export default { Interlude, Interlude2, Interlude2Comb }