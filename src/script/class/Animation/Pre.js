import Ani from './Animation'

class ShrinkRed extends Ani {
    constructor() { super(10, 10, 'shrink shrink-red') }
}

class ShrinkGreed extends Ani {
    constructor() { super(10, 10, 'shrink shrink-green') }
}

class ShrinkYellow extends Ani {
    constructor() { super(10, 10, 'shrink shrink-yellow') }
}

class ShrinkOrange extends Ani {
    constructor() { super(10, 10, 'shrink shrink-orange') }
}

class ShrinkGreedM {
    show(x, y, cb) {
        let count = 0, over = 0
        
        function go() {
            new ShrinkGreed().show(x, y, exit)
            if(++count < 4) setTimeout(go, 100)
        }
        go()
        
        function exit() { if(++over >= 4) cb && cb() }
    }
}

class MarkBlue extends Ani {
    constructor() { super(50, 50, 'mark-blue') }
}

export {
    ShrinkRed,
    ShrinkGreed,
    ShrinkYellow,
    ShrinkGreedM,
    ShrinkOrange,
    MarkBlue,
}
