let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')
let folders = ['.', ...Object.keys(require('./package.json').directories)]
let files = []
for (let folder of folders)
  for (let file of fs.readdirSync(folder).filter(v => v.endsWith('.js')))
    files.push(path.resolve(path.join(folder, file)))
for (let file of files) {
  if (file == path.join(__dirname, __filename)) continue
  console.error('Checking', file)
  spawn('node', ['-c', file])
  .on('exit', () => console.error('Done', file))
  .stderr.on('data', chunk => console.log(chunk.toString()))
}
