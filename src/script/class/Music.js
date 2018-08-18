import { createDom, getFileName } from '../utils'

// 取得所有音乐文件
let context = require.context('../../assets/ogg', false),
    allOgg  = context.keys().map(key => context(key))

class Music {
    listMap = {}        // 所有的音乐对象
    currentBgm = null   // 当前播放的bgm
    
    constructor() {
        allOgg.forEach(v => this.listMap[getFileName(v)] = '/' + v)
    }
    
    // 加载所有音乐
    loadMusic(cb) {
        let listMap = this.listMap,
            all     = []
        
        for(let listMapKey in listMap) {
            all.push(new Promise((resolve, reject) => {
                let audio = createDom('audio')
                
                audio.oncanplay = () => {
                    listMap[listMapKey] = audio
                    resolve()
                }
                audio.onerror = reject
                audio.src = listMap[listMapKey]
            }))
            
        }
        
        Promise.all(all)
               .then(() => cb && cb(true))
               .catch(() => cb && cb(false))
    }
    
    // 播放音效
    play(name) {
        let music = this.listMap[name]
        music.currentTime = 0
        music.loop = false
        music.play()
    }
    // 播放背景音乐(自动循环)
    playBgm(name) {
        if(this.currentBgm) this.currentBgm.pause()
        
        let music = this.listMap[name]
        this.currentBgm = music
        music.currentTime = 0
        music.loop = true
        music.play()
    }
}

export default Music
