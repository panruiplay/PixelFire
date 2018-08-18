import Ani from './Animation'

class ShrinkRed extends Ani {
    constructor() { super(10, 10, 'shrink shrink-red') }
}
class ShrinkGreed extends Ani {
    constructor() { super(10, 10, 'shrink shrink-green') }
}
class ShrinkGreedM{
    show(x, y, cb){
        let count = 0, over = 0
    
        function go() {
            new ShrinkGreed().show(x, y, exit)
            if(++count < 4) setTimeout(go, 100)
        }
        go()
    
        function exit() { if(++over >= 4) cb && cb() }
    }
}

export {
    ShrinkRed,
    ShrinkGreed,
    ShrinkGreedM,
}
