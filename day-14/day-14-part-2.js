import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const padZeros = (str) => {
  let other = str
  while (other.length !== 36) {
    other = '0' + other
  }

  return other
}

const getBinaryValue = R.compose(
  padZeros,
  (value) => (value >>> 0).toString(2),
  parseInt
)

const maskValue = (mask, value) => {
  let binaryValue = getBinaryValue(value).split('')

  for (let i = 0; i < binaryValue.length; i++) {
    if (mask[i] === '1') binaryValue[i] = '1'
    if (mask[i] === 'X') binaryValue[i] = 'X'
  }

  return binaryValue.join('')
}

const getAddressesFromMaskedAddress = (maskedAddress) => {
  if (!maskedAddress.includes('X')) return [maskedAddress.join('')]

  for (let i = 0; i < maskedAddress.length; i++) {
    if (maskedAddress[i] === 'X') {
      let address1 = R.clone(maskedAddress)
      address1[i] = '1'
      let address2 = R.clone(maskedAddress)
      address2[i] = '0'

      return getAddressesFromMaskedAddress(address1).concat(
        getAddressesFromMaskedAddress(address2)
      )
    }
  }
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
      let maskedAddress = maskValue(mask, memoryAddress)
      let allAddresses = getAddressesFromMaskedAddress(maskedAddress.split(''))

      for (const address of allAddresses) {
        memory[address] = getBinaryValue(value)
      }
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

  console.log('Day 14 part 2 solution: ', result)
})()
