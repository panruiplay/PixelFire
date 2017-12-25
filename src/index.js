// import './style/animate.css'
import './style/index.scss'

import Game from './module/Game'
import Music from './module/music/Music'
import Panel from './module/panel/Panel'

Music.loadMusic()

window.onload = function () {
    Chain()
    > Music.init
    > Panel.init
    > Game.init
    > Music.changeBGM.args('main')
    > function (cb) { Music.playBGM() || cb() }
    > Panel.change.args('menu')
    // > Panel.hide.args('loading')
    // > function () {
    //     Game.bgmOk = new Promise(resolve => resolve())
    //     Music.changeBGM('bat', () => Music.playBGM())
    //     Game.GameStart()
    // }
    cgo()
}