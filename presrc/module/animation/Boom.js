import Animation from './Animation'

let Boom = Animation.extend({ width: 10, height: 10, music: 'del1' })

let BoomGreen = Boom.extend({ width: 10, height: 10, cls: 'boom-green' })
let BoomRed = Boom.extend({ width: 10, height: 10, cls: 'boom-red' })
let BoomSpeed = Boom.extend({ width: 10, height: 10, cls: 'boom-speed' })
let BoomYellow = Boom.extend({ width: 10, height: 10, cls: 'boom-yellow' })
let BoomBlue = Boom.extend({ width: 10, height: 10, cls: 'boom-blue' })

export default { BoomBlue, BoomRed, BoomSpeed, BoomYellow, BoomGreen }