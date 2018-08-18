import { VolumeProduction } from './utils'

export default [
    ...VolumeProduction({ enemy: 'Red', createTime: 230, x: 100, y: 30 }, 12, { createTime: 10, y: 50 }),
    // ...VolumeProduction({ enemy: 'Red', createTime: 450 }, 3),
]
