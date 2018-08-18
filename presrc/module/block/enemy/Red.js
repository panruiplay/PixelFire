import Block from '../Block'
import TrackingUser from '../../skill/TrackingUser'
import Shadow from '../../skill/Shadow'

export default Block.extend({
    speed: 1.5,
    beforeAni: 'ShrinkRed',
    birthAni: 'SpreadRed',
    deathAni: 'BoomRed',
    hp: 20,
    cls: 's-red',
    skills: [
        TrackingUser.bind(null, 40),
        Shadow.bind(null, 'ShadowRed', 10, 0)
    ]
})