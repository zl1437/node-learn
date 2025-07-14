const fs = require('fs').promises

const funcRead = async () => {
  try {
    const file = await fs.readFile('./txt.text', 'utf8')
    console.log(file)
  } catch (err) {
    console.error(err)
  }
}
funcRead()