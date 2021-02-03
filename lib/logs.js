let stdouts = []
module.exports = (maxLength = 200) => {
  let oldWrite = process.stdout.write.bind(process.stdout)
  module.exports.disable = () => {
    module.exports.isModified = false
    return process.stdout.write = oldWrite
  }
  process.stdout.write = (chunk, encoding, callback) => {
    stdouts.push(Buffer.from(chunk, encoding))
    oldWrite(chunk, encoding, callback)
    if (stdouts.length > maxLength) stdouts.shift()
  }
  module.exports.isModified = true
  return module.exports
}

module.exports.isModified = false
module.exports.logs = () => Buffer.concat(stdouts)

