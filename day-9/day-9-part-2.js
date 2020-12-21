import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const weaknessNumber = 27911108

  const textArray = getTextArrayInputFromFile('./datasets/day-9')

  const numbersArray = R.map(parseInt, textArray)

  for (let i = 0; i < numbersArray.length; i++) {
    let sum = numbersArray[i]

    let j = i
    while (sum < weaknessNumber) {
      j++
      sum += numbersArray[j]
    }

    if (sum === weaknessNumber) {
      const contiguousValues = R.slice(i, j + 1, numbersArray)

      const values = R.sort((a, b) => a - b, contiguousValues)

      return R.head(values) + R.last(values)
    }
  }
}

;(() => {
  const result = solution()

  console.log('Day 9 part 2 solution: ', result)
})()
