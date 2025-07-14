const fs = require('fs').promises

const readFileSync = async (path) => {
  return await fs.readFile(path, 'utf8')
}
module.exports = {
  readFileSync
}