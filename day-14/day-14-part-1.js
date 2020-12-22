import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const padZeros = (str) => {
  let other = str
  while (other.length !== 36) {
    other = '0' + other
  }

  return other
}

const maskValue = (mask, value) => {
  let binaryValue = R.compose(
    (str) => str.split(''),
    padZeros,
    (value) => (value >>> 0).toString(2),
    parseInt
  )(value)

  for (let i = 0; i < binaryValue.length; i++) {
    if (mask[i] === '0') binaryValue[i] = '0'
    if (mask[i] === '1') binaryValue[i] = '1'
  }

  return binaryValue.join('')
}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-14')

  let mask
  let memory = {}

  for (const row of textArray) {
    const [instruction, value] = row.split(' = ')

    if (instruction.includes('mask')) {
      mask = value
    } else {
      let memoryAddress = R.compose(R.init, R.last, R.split('['))(instruction)

      memory[memoryAddress] = maskValue(mask, value)
    }
  }

  let sum = 0

  for (const value of Object.values(memory)) {
    sum += parseInt(value, 2)
  }

  return sum
}

;(() => {
  const result = solution()

  console.log('Day 14 part 1 solution: ', result)
})()
