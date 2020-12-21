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

    const currentGroup = R.last(groups)
    currentGroup.numberOfPeople = currentGroup.numberOfPeople
      ? currentGroup.numberOfPeople + 1
      : 1

    for (const char of row) {
      currentGroup[char] = currentGroup[char] ? currentGroup[char] + 1 : 1
    }
  }

  let sum = 0

  for (const group of groups) {
    const validKeys = Object.keys(group).filter((key) => {
      return group[key] === group.numberOfPeople
    })

    sum += validKeys.length - 1
  }

  return sum
}

;(() => {
  const result = solution()

  console.log('Day 6 part 2 solution: ', result)
})()
