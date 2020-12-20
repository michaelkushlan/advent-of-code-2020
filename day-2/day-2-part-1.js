import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-2')

  const passwordWithPolicyInformation = textArray.map((entry) => {
    const [part1, part2, password] = entry.split(' ')

    const [lowValue, highValue] = part1.split('-')
    const [letter] = part2.split(':')

    return {
      lowValue,
      highValue,
      letter,
      password,
    }
  })

  return R.reduce(
    (prev, passwordWithPolicyInformation) => {
      const letterCounts = R.countBy(
        (self) => self,
        passwordWithPolicyInformation.password.split('')
      )

      if (
        letterCounts[passwordWithPolicyInformation.letter] >=
          passwordWithPolicyInformation.lowValue &&
        letterCounts[passwordWithPolicyInformation.letter] <=
          passwordWithPolicyInformation.highValue
      )
        return prev + 1

      return prev
    },
    0,
    passwordWithPolicyInformation
  )
}

;(() => {
  const solution = part1Solution()

  console.log('Day 2 part 1 solution: ', solution)
})()
