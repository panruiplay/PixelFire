export default {
    allBind(target) {
        for(let key in target) {
            if(typeof target[key] === 'function') {
                target[key] = target[key].bind(target)
            }
        }
        return target
    },
    wait(time, cb) {setTimeout(cb, time)},
    lock(fn) {
        let lockState = false,
            unlock    = function () {lockState = false},
            lockFn    = fn(unlock)

        return function () {
            if(lockState) return

            lockState = true
            lockFn.apply(null, Array.prototype.slice.call(arguments))
        }
    },

    // 数学方法
    unique(array) {
        let r = []
        for(let i = 0, l = array.length; i < l; i++) {
            for(let j = i + 1; j < l; j++) if(array[i] === array[j]) j = ++i
            r.push(array[i])
        }
        return r
    },
    tmp2: 180 / Math.PI,
    random: (min, max) => Math.random() * (max - min + 1) + min >> 0,
    randomAngle: () => Math.random() * 360 >> 0
}