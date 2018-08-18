import Block from '../Block'
import TrackingUser from '../../skill/TrackingUser'
import Shadow from '../../skill/Shadow'

export default Block.extend({
    speed: 3.5,
    length: 8,
    ax: 0,
    ay: 0,
    // 四叉树辅助用
    width: 8,
    height: 8,
    beforeAni: 'ShrinkSpeed',
    deathAni: 'BoomSpeed',
    hp: 10,
    cls: 's-speed',
    skills: [
        TrackingUser.bind(null, 25),
        Shadow.bind(null, 'ShadowSpeed', 6, undefined)
    ]
})