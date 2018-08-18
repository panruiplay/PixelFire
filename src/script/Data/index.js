import { getFileName } from '../utils'

let ctx = require.context('./', false, /\.js$/),
    all = ctx.keys().filter(item => item != './index.js' && item != './utils.js').map(key => {
        return {
            name: getFileName(key),
            value: ctx(key).default
        }
    }),
    map = {}

all.forEach(v => { map[v.name] = v.value})

export default map
