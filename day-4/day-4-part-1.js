import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

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

      if (key === 'cid') continue

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

  console.log('Day 4 part 1 solution: ', result)
})()
