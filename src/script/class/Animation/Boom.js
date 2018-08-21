import Ani from './Animation'

class BoomRed extends Ani {
    constructor() { super(10, 10, 'boom boom-red', 'del1') }
}
class BoomGreen extends Ani {
    constructor() { super(10, 10, 'boom boom-green', 'del1') }
}
class BoomYellow extends Ani {
    constructor() { super(10, 10, 'boom boom-yellow', 'del1') }
}
class BoomOrange extends Ani {
    constructor() { super(10, 10, 'boom boom-orange', 'del1') }
}
class BoomBlue extends Ani {
    constructor() { super(10, 10, 'boom boom-blue', 'del1') }
}
class BoomSBlue extends Ani {
    constructor() { super(10, 10, 'boom boom-s-blue', 'del2') }
}

export {
    BoomRed,
    BoomGreen,
    BoomYellow,
    BoomOrange,
    BoomBlue,
    BoomSBlue,
}
