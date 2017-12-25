export default Base.extend({
    constructor(holder) {
        this.holder = holder
    },

    holder: null,
    fn: null,
    nowStep: 0,
    cd: 10,
    running: false,

    // 进一步
    step() {
        if(this.nowStep++ === this.cd) {
            let reset = () => this.nowStep = 0
            this.fn(reset)
        }
        return this
    },
    // 重置冷却时间
    reset() {
        this.nowStep = 0
        return this
    },
    // 调整冷却时间
    setCD(time) {
        this.cd = time
        return this.reset()
    }
})