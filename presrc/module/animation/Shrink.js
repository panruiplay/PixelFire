import Animation from './Animation'

let ShrinkGreen = Animation.extend({ width: 10, height: 10, cls: 'shrink-green' })
let ShrinkRed = Animation.extend({ width: 10, height: 10, cls: 'shrink-red' })
let ShrinkSpeed = Animation.extend({ width: 10, height: 10, cls: 'shrink-speed' })
let ShrinkYellow = Animation.extend({ width: 10, height: 10, cls: 'shrink-yellow' })
let ShrinkBlue = Animation.extend({ width: 10, height: 10, cls: 'shrink-blue' })

export default { ShrinkBlue, ShrinkRed, ShrinkSpeed, ShrinkYellow, ShrinkGreen }