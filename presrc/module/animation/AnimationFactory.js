import Spread from './Spread'
import Shrink from './Shrink'
import Boom from './Boom'
import Shadow from './Shadow'
import Interlude from './Interlude'
import Combination from './Combination'

export default function (aniType, ...args) {
    switch(aniType) {
        // 扩散
        case 'SpreadRed':
            return new Spread.SpreadRed(...args)
        case 'SpreadGreen':
            return new Spread.SpreadGreen(...args)
        case 'SpreadBlue':
            return new Spread.SpreadBlue(...args)
        // 收缩
        case 'ShrinkRed':
            return new Shrink.ShrinkRed(...args)
        case 'ShrinkBlue':
            return new Shrink.ShrinkBlue(...args)
        case 'ShrinkYellow':
            return new Shrink.ShrinkYellow(...args)
        case 'ShrinkGreen':
            return new Shrink.ShrinkGreen(...args)
        case 'ShrinkSpeed':
            return new Shrink.ShrinkSpeed(...args)
        // 爆炸
        case 'BoomRed':
            return new Boom.BoomRed(...args)
        case 'BoomBlue':
            return new Boom.BoomBlue(...args)
        case 'BoomYellow':
            return new Boom.BoomYellow(...args)
        case 'BoomGreen':
            return new Boom.BoomGreen(...args)
        case 'BoomSpeed':
            return new Boom.BoomSpeed(...args)
        // 阴影
        case 'ShadowRed':
            return new Shadow.ShadowRed(...args)
        case 'ShadowSpeed':
            return new Shadow.ShadowSpeed(...args)
        case 'ShadowYellow':
            return new Shadow.ShadowYellow(...args)
        // 其它
        case 'Interlude':
            return new Interlude.Interlude(...args)
        case 'Interlude2':
            return new Interlude.Interlude2(...args)
        case 'Interlude2Comb':
            return new Interlude.Interlude2Comb(...args)
        // 组合动画
        case 'UserBirth':
            return new Combination.UserBirth(...args)
        case 'SparkExplosion':
            return new Combination.SparkExplosion(...args)
    }
}