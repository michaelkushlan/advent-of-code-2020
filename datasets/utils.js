import fs from 'fs'

const getTextArrayInputFromFile = (filename) => {
  return fs.readFileSync(filename, 'utf8').split('\n')
}

export { getTextArrayInputFromFile }
