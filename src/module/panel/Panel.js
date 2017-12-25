import './panel.scss'
import utils from '@/utils/utils'
import dom from '@/utils/dom'
import Chain from 'func-chain'

let Panel = {
    nowPanel: 'loading',
    changing: false,
    
    // 初始化加载所有面板
    init(cb) {
        Array.from(document.querySelectorAll('.panel')).forEach(v => {
            let name = v.className.replace(/(panel)| /g, '')
            this[name] = v
        })
        cb()
    },
    // 隐藏面板
    hide(panel = this.nowPanel, cb) {
        if(this.changing) return
        this.changing = true
        panel = this[panel]
        dom.animationEnd(panel, () => {
            dom.hide(panel)
            dom.removeClass(panel, 'animated fadeOut')
            this.changing = false
            cb && cb()
        })
        dom.addClass(panel, 'animated fadeOut')
    },
    // 显示面板
    show(panel = this.nowPanel, cb) {
        if(this.changing) return
        this.changing = true
        this.nowPanel = panel
        panel = this[panel]
        dom.addClass(panel, 'animated fadeIn')
        dom.show(panel, 'flex')
        dom.animationEnd(panel, () => {
            this.changing = false
            dom.removeClass(panel, 'animated fadeIn')
            cb && cb()
        })
    },
    // 切换面板
    change(panel = this.nowPanel, cb) {
        Chain()
        > this.hide.args(this.nowPanel)
        > this.show.args(panel)
        > function () { cb && cb() }
        || Chain.go()
    }
}

export default utils.allBind(Panel)