let context = require.context('./', false, /\.js$/),
    all     = context.keys().filter(item => item !== './Factory.js').map(key => context(key)),
    map     = {}

all.forEach(v => {
    map[v.default.FactoryName] = v.default
})

export default function (name, x, y) {
    return new map[name](x, y)
}
