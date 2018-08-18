import Ani from './Animation'

class BoomRed extends Ani {
    constructor() { super(10, 10, 'boom boom-red', 'del1') }
}
class BoomGreen extends Ani {
    constructor() { super(10, 10, 'boom boom-green', 'del1') }
}

export {
    BoomRed,
    BoomGreen,
}
