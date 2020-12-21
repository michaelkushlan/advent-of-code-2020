import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const canSum = (arrayOfNumbers, number) => {
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    for (let j = 0; j < arrayOfNumbers.length; j++) {
      if (i !== j && arrayOfNumbers[i] + arrayOfNumbers[j] === number)
        return true
    }
  }

  return false
}

const solution = (preambleLength = 25) => {
  const textArray = getTextArrayInputFromFile('./datasets/day-9')

  const numbersArray = R.map(parseInt, textArray)

  let [preamble, remainingNumbers] = R.splitAt(preambleLength, numbersArray)

  for (const number of remainingNumbers) {
    if (!canSum(preamble, number)) return number

    preamble = R.tail(preamble).concat(number)
  }
}

;(() => {
  const result = solution()

  console.log('Day 9 part 1 solution: ', result)
})()
