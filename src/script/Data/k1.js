import { VolumeProduction } from './utils'

export default [
    ...VolumeProduction({ enemy: 'Red', createTime: 30 }, 6, { createTime: 100 }),
    ...VolumeProduction({ enemy: 'Red', createTime: 810, x: 300, y: 100 }, 8, { createTime: 10, y: 62 }),
    ...VolumeProduction({ enemy: 'Red', createTime: 920, x: 700, y: 100 }, 8, { createTime: 10, y: 62 }),
    { enemy: 'Orange', createTime: 1500 },
    { enemy: 'Orange', createTime: 1550 },
    { enemy: 'Orange', createTime: 1650 },
    { enemy: 'Red', createTime: 1720 },
    ...VolumeProduction({ enemy: 'Orange', createTime: 1800 }, 3, { createTime: 40 }),
    { enemy: 'Yellow', createTime: 1950 },
    { enemy: 'Yellow', createTime: 2000 },
    ...VolumeProduction({ enemy: 'Red', createTime: 2100 }, 10, { createTime: 110 }),
    ...VolumeProduction({ enemy: 'Orange', createTime: 2300 }, 5, { createTime: 180 }),
    { enemy: 'Yellow', createTime: 2330 },
    ...VolumeProduction({ enemy: 'Yellow', createTime: 2400, x: 'user' }, 4, { createTime: 80 }),
]
