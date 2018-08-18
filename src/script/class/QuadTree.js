/*！
该部分代码参考以下文章
作者：lxjwlt
链接：http://blog.lxjwlt.com/front-end/2014/09/04/quadtree-for-collide-detection.html
來源：个人博客
*/

import Rect from './Rect'

/**
 * 四叉树对象，用于碰撞检测
 * @property {Rect[]} objects - 保存在该节点本身的物体对象
 * @property {QuadTree[]} nodes - 子节点
 * @property {Rect} bounds - 该节点矩形范围
 */
class QuadTree {
    // 每个节点最大物体数量
    static MAX_OBJECTS = 7
    
    // 判断矩形是否在象限范围内
    static isInner = function (rect, bound) {
        return rect.x >= bound.x &&
            rect.x + rect.width <= bound.x + bound.width &&
            rect.y >= bound.y &&
            rect.y + rect.height <= bound.y + bound.height
    }
    
    /**
     * @constructor
     * @param {Rect} rect - 边界对象
     */
    constructor(rect) {
        this.objects = []
        this.nodes = []
        this.bounds = rect
    }
    
    /**
     * 判断物体属于哪个象限
     * @param {Rect} rect - 需要判断的矩形
     * @return {number}
     *     0  - 象限一
     *     1  - 象限二
     *     2  - 象限三
     *     3  - 象限四
     *     -1 - 物体跨越多个象限
     */
    getIndex(rect) {
        let bounds   = this.bounds,
            onTop    = rect.y + rect.height <= bounds.centerY,
            onBottom = rect.y >= bounds.centerY,
            onLeft   = rect.x + rect.width <= bounds.centerX,
            onRight  = rect.x >= bounds.centerX
        
        if(onTop) {
            if(onRight) {
                return 0
            } else if(onLeft) {
                return 1
            }
        } else if(onBottom) {
            if(onLeft) {
                return 2
            } else if(onRight) {
                return 3
            }
        }
        
        return -1
    }
    
    /**
     * 划分为4个子象限
     */
    split() {
        let bounds  = this.bounds,
            x       = bounds.x,
            y       = bounds.y,
            sWidth  = bounds.width / 2,
            sHeight = bounds.height / 2
        
        this.nodes.push(
            new QuadTree(new Rect(bounds.centerX, y, sWidth, sHeight)),
            new QuadTree(new Rect(x, y, sWidth, sHeight)),
            new QuadTree(new Rect(x, bounds.centerY, sWidth, sHeight)),
            new QuadTree(new Rect(bounds.centerX, bounds.centerY, sWidth, sHeight))
        )
    }
    
    /**
     * 插入物体
     * @param {Rect} rect - 需要插入的物体
     *
     * - 如果当前节点存在子节点，则检查物体到底属于哪个子节点，
     *   如果能匹配到子节点，则将该物体插入到该子节点中，否则保存在节点自身
     *
     * - 如果当前节点不存在子节点，将该物体存储在当前节点。
     *   随后，检查当前节点的存储数量，如果超过了最大存储数量，则对当前节点进行划分，
     *   划分完成后，将当前节点存储的物体重新分配到四个子节点中。
     */
    insert(rect) {
        let objects = this.objects,
            i, index
        
        // 如果该节点下存在子节点
        if(this.nodes.length) {
            index = this.getIndex(rect)
            if(index !== -1) {
                this.nodes[index].insert(rect)
                return
            }
        }
        
        // 否则存储在当前节点下
        objects.push(rect)
        
        // 如果当前节点没有分裂过 并且 存储的数量超过了MAX_OBJECTS
        if(!this.nodes.length && this.objects.length > QuadTree.MAX_OBJECTS) {
            this.split()
            
            for(i = objects.length - 1; i >= 0; i--) {
                index = this.getIndex(objects[i])
                if(index !== -1) {
                    this.nodes[index].insert(objects.splice(i, 1)[0])
                }
            }
        }
    }
    
    /**
     * 检索功能:
     * 给出一个物体对象，将该物体可能发生碰撞的所有物体选取出来。
     * 该函数先查找物体所属的象限，该象限下的物体都是有可能发生碰撞的，然后再递归地查找子象限。
     * @param {Rect} rect - 需要检索的矩形对象
     * @return {Rect[]}
     */
    retrieve(rect) {
        let result = [],
            arr, i, index
        
        if(this.nodes.length) {
            index = this.getIndex(rect)
            if(index !== -1) {
                result = result.concat(this.nodes[index].retrieve(rect))
            } else {
                // 切割矩形
                arr = rect.carve(this.bounds.centerX, this.bounds.centerY)
                
                for(i = arr.length - 1; i >= 0; i--) {
                    index = this.getIndex(arr[i])
                    result = result.concat(this.nodes[index].retrieve(rect))
                }
            }
        }
        
        result = result.concat(this.objects)
        
        return result
    }
    
    /**
     * 移除目标矩形对象，如果在自身没有找到，则递归查找子象限
     * @param {Rect} rect - 要删除伯矩形对象
     * @return {boolean} 是否成功删除目标对象
     */
    remove(rect) {
        let objects = this.objects,
            nodes   = this.nodes
        
        let target = objects.findIndex(v => v === rect)
        
        if(target !== -1) {
            objects.splice(target, 1)
            return true
        } else if(nodes.length) {
            for(let i = 0; i < nodes.length; i++) {
                let node = nodes[i]
                if(node.remove(rect)) {
                    return true
                }
            }
        }
        
        return false
    }
    
    /**
     * 动态刷新
     * 从根节点深入四叉树，检查四叉树各个节点存储的物体是否依旧属于该节点（象限）的范围之内，如果不属于，则重新插入该物体。
     * @param {QuadTree} root - 当前检索的节点对象
     */
    refresh(root = this) {
        let objects = this.objects,
            rect, index, i, len
        
        for(i = objects.length - 1; i >= 0; i--) {
            rect = objects[i]
            index = this.getIndex(rect)
            // 如果矩形不属于该象限，则将该矩形重新插入
            if(!QuadTree.isInner(rect, this.bounds)) {
                if(this !== root) {
                    root.insert(objects.splice(i, 1)[0])
                }
                // 如果矩形属于该象限 且 该象限具有子象限，则
                // 将该矩形安插到子象限中
            } else if(this.nodes.length && index !== -1) {
                this.nodes[index].insert(objects.splice(i, 1)[0])
            }
        }
        
        // 递归刷新子象限
        for(i = 0, len = this.nodes.length; i < len; i++) {
            this.nodes[i].refresh(root)
        }
    }
}

export default QuadTree
