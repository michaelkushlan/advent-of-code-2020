import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const keyValueIsInvalid = (key, value) => {
  let integerValue

  switch (key) {
    case 'byr':
      integerValue = parseInt(value)

      return integerValue >= 1920 && integerValue <= 2002
    case 'iyr':
      integerValue = parseInt(value)

      return integerValue >= 2010 && integerValue <= 2020
    case 'eyr':
      integerValue = parseInt(value)

      return integerValue >= 2020 && integerValue <= 2030
    case 'hgt':
      const [num, unit] = R.splitAt(value.length - 2, value)

      console.log(unit, num)
      if (unit !== 'cm' && unit !== 'in') return false
      if (unit === 'cm') {
        integerValue = parseInt(num)
        return integerValue >= 150 && integerValue <= 193
      }
      if (unit === 'in') {
        integerValue = parseInt(num)
        return integerValue >= 59 && integerValue <= 76
      }
    case 'hcl':
      const validStrings = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ]
      if (value[0] === '#' && value.length === 7) {
        for (let i = 1; i < value.length; i++) {
          if (!R.includes(value[i], validStrings)) return false
        }

        return true
      }

      return false
    case 'ecl':
      const validValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      return R.includes(value, validValues)
    case 'pid':
      if (value.length === 9) {
        for (const char of value) {
          if (!Number.isInteger(parseInt(char))) return false
        }

        return true
      }
    case 'cid':
      return false
  }
}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-4')

  let passportData = [{}]

  for (const row of textArray) {
    if (row === '') {
      passportData.push({})
      continue
    }

    const data = row.split(' ')
    for (const entry of data) {
      const [key, value] = entry.split(':')

      if (!keyValueIsInvalid(key, value)) {
        continue
      }

      passportData[passportData.length - 1][key] = value
    }
  }

  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  let numValid = 0

  for (const passport of passportData) {
    const passportKeys = Object.keys(passport)

    if (R.isEmpty(R.symmetricDifference(passportKeys, requiredKeys))) numValid++
  }

  return numValid
}

;(() => {
  const result = solution()

  console.log('Day 4 part 2 solution: ', result)
})()
