const path = require('path')
const fs = require('fs')

class Database {
    constructor(filepath, ...args) {
        this.file = path.resolve(filepath)
        this.load()
        this._jsonargs = args
    }

    get data() {
        return this._data
    }

    set data(value) {
        this._data = value
        this.save()
    }

    load() {
        return this._data = fs.existsSync(this.file) ? JSON.parse(fs.readFileSync(this.file)) : {}
    }

    save() {
        let dirname = path.dirname(this.file)
        !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true })
        fs.writeFileSync(this.file, JSON.stringify(this._data, ...this._jsonargs))
        return this.file
    }
}

module.exports = Database

