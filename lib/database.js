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
        try {
          return this._data = fs.existsSync(this.file) ? JSON.parse(fs.readFileSync(this.file)) : {}
        } catch (e) {
          console.error(e)
          return this._data = {}
        }
    }

    save() {
        let dirname = path.dirname(this.file)
        !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true })
        fs.writeFileSync(this.file, JSON.stringify(this._data, ...this._jsonargs))
        return this.file
    }
}

module.exports = Database

