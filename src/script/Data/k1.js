import { VolumeProduction } from './utils'

export default [
    ...VolumeProduction({ enemy: 'Red', createTime: 30, x: 100, y: 30 }, 20, { createTime: 30, y: 10 }),
    // ...VolumeProduction({ enemy: 'Red', createTime: 450 }, 3),
]
