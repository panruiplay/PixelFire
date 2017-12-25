import type from './MusicType'
import dom from '@/utils/dom'
import utils from '@/utils/utils'

let format = name => `/assets/ogg/${name}.ogg`

let Music = {
    BGM: dom.create('audio'),
    bgmPro: null,    // 加载bgm时的Promise对象
    bgmOk: false,    // 当BGM准备就绪时
    
    // 初始化
    init(cb) {
        this.BGM.loop = true
        this.initLoadMusic(cb)
    },
    // 初始加载音乐
    initLoadMusic(cb) {
        // 加载单个音乐
        let load = (name, musicSrc) => new Promise(resolve => {
            let audio              = dom.create('audio')
            audio.oncanplaythrough = resolve
            audio.src              = musicSrc
            audio.volume           = 0.5
            this[name]             = audio
        })
        
        // 遍历加载音乐
        let arr = []
        for(let key in type) key !== 'bgList' && arr.push(load(key, format(key)))
        
        // 加载初始背景音乐
        arr.push(new Promise(resolve => this.changeBGM(type.bgList.main, resolve)))
        
        Promise.all(arr).then(function () {
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
        let tmp  = 50
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
    // 切换背景音乐，并不会播放
    changeBGM(name, cb) {
        this.bgmOk   = false
        this.bgmPro  = new Promise(resolve => {
            this.BGM.oncanplaythrough = () => {
                this.bgmOk = true
                resolve()
                cb && cb()
                Music.BGM.oncanplaythrough = null
            }
        })
        this.BGM.src = format('bgm_' + name)
    },
    // 播放背景音乐
    playBGM() { this.play('BGM') },
    // 暂停背景音乐
    pauseBGM(cb) { this.pause('BGM', cb) }
}

utils.allBind(Music)

export default Music