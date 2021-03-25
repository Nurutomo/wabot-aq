module.exports = {
    /**
     * Growth rate
     * `2.576652002695681`
     */
    growth: Math.pow(Math.PI / Math.E, 1.618) * Math.E * .75,
    /**
     * get XP range at specified level
     * @param {Number} level 
     * @param {Number} multiplier 
     */
    xpRange(level, multiplier = global.multiplier || 1) {
        if (level < 0) throw new TypeError('level cannot be negative value')
        level = Math.floor(level)
        let min = level === 0 ? 0 : Math.round(Math.pow(level, this.growth) * multiplier) + 1
        let max = Math.round(Math.pow(++level, this.growth) * multiplier)
        return {
            min,
            max,
            xp: max - min
        }
    },
    /**
     * get level by xp
     * @param {Number} xp 
     * @param {Number} multiplier 
     */
    findLevel(xp, multiplier = global.multiplier || 1) {
        if (xp === Infinity) return Infinity
        if (isNaN(xp)) return NaN
        if (xp <= 0) return -1
        let level = 0
        do level++
        while (this.xpRange(level, multiplier).min <= xp)
        return --level
    },
    /**
     * is able to level up?
     * @param {Number} level 
     * @param {Number} xp 
     * @param {Number} multiplier 
     */
    canLevelUp(level, xp, multiplier = global.multiplier || 1) {
        if (level < 0) return false
        if (xp === Infinity) return true
        if (isNaN(xp)) return false
        if (xp <= 0) return false
        return level < this.findLevel(xp, multiplier)
    }
}