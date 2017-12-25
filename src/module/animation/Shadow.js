import Animation from './Animation'

let ShadowRed = Animation.extend({ cls: 'red-shadow', width: 8, height: 8 })
let ShadowSpeed = Animation.extend({ cls: 'speed-shadow', width: 6, height: 6 })
let ShadowYellow = Animation.extend({ cls: 'yellow-shadow', width: 10, height: 10 })

export default { ShadowRed, ShadowSpeed, ShadowYellow }