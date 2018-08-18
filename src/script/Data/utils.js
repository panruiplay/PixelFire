let { random } = Math

// 批量生产
export function VolumeProduction(obj, num, fixAdd) {
    let arr = []
    let copy = JSON.stringify(obj)
    
    for(let i = 0; i < num; i++) {
        let newObj = JSON.parse(copy)
        if(fixAdd) {
            for(let fixAddKey in fixAdd) {
                if(newObj[fixAddKey]) {
                    newObj[fixAddKey] += fixAdd[fixAddKey] * i
                }
            }
        }
        arr.push(newObj)
    }
    
    return arr
}
