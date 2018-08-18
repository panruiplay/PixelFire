/**
 * 矩形对象
 * @property {number} x - 起始位置x
 * @property {number} y - 起始位置y
 * @property {number} centerX - 中心x位置
 * @property {number} centerY - 中心y位置
 * @property {number} width - 宽度
 * @property {number} height - 高度
 */
class Rect {
    // 按中心点创建单位
    static centerCreate(centerX, centerY, width, height) {
        return new Rect(centerX - width / 2, centerY - height / 2, width, height)
    }
    
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.centerX = x + width / 2
        this.centerY = y + height / 2
    }
    
    // 更新中心位置
    update() {
        this.centerX = this.x + this.width / 2
        this.centerY = this.y + this.height / 2
    }
    
    /**
     * 切割矩形
     * @param {number} cX - 纵向切线 x坐标
     * @param {number} cY - 横向切线 y坐标
     * @return {Rect[]}
     */
    carve(cX, cY) {
        let result = [],
            temp   = [],
            dX     = cX - this.x,
            dY     = cY - this.y,
            carveX = dX > 0 && dX < this.width,
            carveY = dY > 0 && dY < this.height
        
        // 切割XY方向
        if(carveX && carveY) {
            temp = this.carve(cX, this.y)
            while(temp.length) {
                result = result.concat(temp.shift().carve(this.x, cY))
            }
            // 只切割X方向
        } else if(carveX) {
            result.push(
                new Rect(this.x, this.y, dX, this.height),
                new Rect(cX, this.y, this.width - dX, this.height)
            )
            // 只切割Y方向
        } else if(carveY) {
            result.push(
                new Rect(this.x, this.y, this.width, dY),
                new Rect(this.x, cY, this.width, this.height - dY)
            )
        }
        
        return result
    }
}

export default Rect
