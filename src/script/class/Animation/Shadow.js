import Ani from './Animation'

class ShadowRed extends Ani {
    constructor() { super(8, 8, 'shadow shadow-red') }
}
class ShadowYellow extends Ani {
    constructor() { super(12, 12, 'shadow shadow-yellow') }
}
class ShadowOrange extends Ani {
    constructor() { super(6, 6, 'shadow shadow-orange') }
}

export {
    ShadowRed,
    ShadowYellow,
    ShadowOrange,
}
