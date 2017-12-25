import type from './MusicType'
import dom from '@/utils/dom'
import utils from '@/utils/utils'

let format = name => `/assets/ogg/${name}.ogg`

let Music = {
    BGM: dom.create('audio'),

    // 初始化
    init(cb) {
        this.BGM.loop = true
        this.loadMusic()
        cb && cb()
    },
    // 加载音乐
    loadMusic(cb) {
        // 加载单个音乐
        let load = (name, musicSrc) => new Promise(resolve => {
            let audio = dom.create('audio')
            audio.oncanplaythrough = resolve
            audio.src = musicSrc
            this[name] = audio
        })

        // 遍历加载音乐
        let arr = []
        for(let key in type) key !== 'bgList' && arr.push(load(key, format(key)))

        Promise.all(arr).then(function () {
            Music['fire1'].volume = 0.5
            cb && cb()
        })
    },
    // 播放音乐
    play(music) {
        this[music].currentTime = 0
        this[music].play()
    },
    // 暂停播放
    pause(music, cb) {
        let tmp = 50
        let stop = setInterval(() => {
            if(--tmp) {
                this[music].volume = tmp * 0.02
            } else {
                clearInterval(stop)
                this[music].pause()
                this[music].volume = 1
                cb && cb()
            }
        }, 16)
    },
    // 切换背景音乐
    changeBGM(name, cb) {
        this.BGM.oncanplaythrough = function () {
            cb && cb()
            Music.BGM.oncanplaythrough = null
        }
        this.BGM.src = format('bgm_' + name)
    },
    // 播放背景音乐
    playBGM() { this.play('BGM') },
    // 暂停背景音乐
    pauseBGM(cb) { this.pause('BGM', cb) }
}

utils.allBind(Music)

export default Music