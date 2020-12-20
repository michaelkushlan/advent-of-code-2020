import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-1-part-1')

  for (const value1 of textArray) {
    const num1 = parseInt(value1)

    for (const value2 of textArray) {
      const num2 = parseInt(value2)

      if (num1 + num2 === 2020) return num1 * num2
    }
  }
}

;(() => {
  const solution = part1Solution()

  console.log('Day 1 part 1 solution: ', solution)
})()
