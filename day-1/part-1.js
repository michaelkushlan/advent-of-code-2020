import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-1-part-1')

  for (const value1 of textArray) {
    const num1 = parseInt(value1)

    for (const value2 of textArray) {
      const num2 = parseInt(value2)

      for (const value3 of textArray) {
        const num3 = parseInt(value3)

        if (num1 + num2 + num3 === 2020) return num1 * num2 * num3
      }
    }
  }
}

;(() => {
  const solution = part1Solution()

  console.log('Day 1 part 1 solution: ', solution)
})()
