import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-2')

  const passwordWithPolicyInformation = textArray.map((entry) => {
    const [part1, part2, password] = entry.split(' ')

    const [firstIndex, secondIndex] = part1.split('-')
    const [letter] = part2.split(':')

    return {
      firstIndex: firstIndex - 1,
      secondIndex: secondIndex - 1,
      letter,
      password,
    }
  })

  return R.reduce(
    (prev, { firstIndex, secondIndex, password, letter }) => {
      if (
        (password[firstIndex] !== letter && password[secondIndex] !== letter) ||
        (password[firstIndex] === letter && password[secondIndex] === letter)
      )
        return prev

      return prev + 1
    },
    0,
    passwordWithPolicyInformation
  )
}

;(() => {
  const solution = part1Solution()

  console.log('Day 2 part 2 solution: ', solution)
})()
