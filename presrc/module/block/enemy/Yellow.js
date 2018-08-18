import Block from '../Block'
import Shadow from '../../skill/Shadow'
import { Boundary2 } from '@/module/block/plugin'

let Yellow = Block.extend({
    speed: 2,
    length: 12,
    // 四叉树辅助用
    width: 10,
    height: 10,
    beforeAni: null,
    deathAni: 'BoomYellow',
    hp: 20,
    cls: 's-yellow',
    afterUpdatePlugin: [Boundary2],
    skills: [
        Shadow.bind(null, 'ShadowYellow', 12, undefined)
    ]
})

export default Yellow
