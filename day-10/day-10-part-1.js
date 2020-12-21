import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-10')

  const integerArray = R.map(parseInt, textArray)

  const sortedArray = R.sort((a, b) => a - b, integerArray)

  let current = 0
  let oneVoltDifferences = 0
  let threeVoltDifferences = 0

  for (const value of sortedArray) {
    if (value - current === 1) oneVoltDifferences++
    if (value - current === 3) threeVoltDifferences++

    current = value
  }

  return oneVoltDifferences * (threeVoltDifferences + 1)
}

;(() => {
  const result = solution()

  console.log('Day 10 part 1 solution: ', result)
})()
