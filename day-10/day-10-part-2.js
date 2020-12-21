import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-10')

  const integerArray = R.map(parseInt, textArray)

  const sortedArray = R.sort((a, b) => a - b, integerArray)

  let countPaths = (startValue, data) => {
    if (data[0] - startValue > 3) return 0

    if (data.length === 1) {
      return 1
    }

    return (
      countPaths(data[0], R.tail(data)) + countPaths(startValue, R.tail(data))
    )
  }

  countPaths = R.memoizeWith((startValue, data) => {
    return startValue.toString() + R.sum(data)
  }, countPaths)

  return countPaths(0, sortedArray)
}

;(() => {
  const result = solution()

  console.log('Day 10 part 2 solution: ', result)
})()
