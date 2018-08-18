let { atan2 } = Math,
    tmp2      = 180 / Math.PI

// 点到另一个点的角度
export function pointDeg(x1, y1, x2, y2) {
    return atan2(y2 - y1, x2 - x1) * tmp2
}
