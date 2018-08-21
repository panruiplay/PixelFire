import Ani from './Animation'

class SpreadRed extends Ani {
    constructor() { super(10, 10, 'spread spread-red') }
}
class SpreadGreen extends Ani {
    constructor() { super(10, 10, 'spread spread-green') }
}
class SpreadBlue extends Ani {
    constructor() { super(10, 10, 'spread spread-blue') }
}

export {
    SpreadRed,
    SpreadGreen,
    SpreadBlue,
}
