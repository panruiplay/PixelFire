import './style/index.css'
import './style/block.css'
import './style/animation.css'
import './style/pointer.css'
import Game from './script/class/Game'

Game.init()

if(window.env === 'dev'){
    window.game = Game
}
