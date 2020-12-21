import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-6')

  let groups = [{}]

  for (const row of textArray) {
    if (row === '') {
      groups.push({})
      continue
    }

    for (const char of row) {
      const currentGroup = R.last(groups)
      currentGroup[char] = currentGroup[char] ? currentGroup[char] + 1 : 1
    }
  }

  let sum = 0

  for (const group of groups) {
    sum += Object.keys(group).length
  }

  return sum
}

;(() => {
  const result = solution()

  console.log('Day 6 part 1 solution: ', result)
})()
