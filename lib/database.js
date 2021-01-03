const path = require('path')
const fs = require('fs')

class Database {
    constructor(filepath) {
        this.file = path.resolve(path.join('./database', filepath))
        this.load()
    }

    get data() {
        return this._data
    }

    set data(value) {
        this._data = value
        this.save()
    }

    load() {
        if (fs.existsSync(this.file)) this._data = JSON.parse(fs.readFileSync(this.file))
        else this._data = {}
        return this._data
    }

    save() {
        let dirname = path.dirname(this.file)
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true })
        }
        fs.writeFileSync(this.file, JSON.stringify(this._data))
    }
}
delete require.cache[require.resolve(__filename)]

