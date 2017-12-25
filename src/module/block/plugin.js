import Game from '../Game'

// 边界碰撞处理方式 【越界死亡】 update之后
export function Boundary2() {
    if(this.x > Game.width || this.x + this.length < 0 ||
        this.y > Game.height || this.y + this.length < 0) {
        this.destroy()
    }
}

// 边界碰撞处理方式 【禁止越界】 move之后
export function Boundary1() {
    let len = this.length
    if(this.x + len > Game.width)
        this.x = Game.width - len
    else if(this.x < 0)
        this.x = 0
    if(this.y + len > Game.height)
        this.y = Game.height - len
    else if(this.y < 0)
        this.y = 0
}

// 边界碰撞处理方式 【边界反弹】 move之后与【禁止越界】选其一
export function Boundary3() {
    let len = this.length
    if(this.x + len > Game.width) {
        this.x = Game.width - len
        this.vx = -this.vx
    }
    else if(this.x < 0) {
        this.x = 0
        this.vx = -this.vx
    }
    if(this.y + len > Game.height) {
        this.y = Game.height - len
        this.vy = -this.vy
    }
    else if(this.y < 0) {
        this.y = 0
        this.vy = -this.vy
    }
}