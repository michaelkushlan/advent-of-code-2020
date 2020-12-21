import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const numberOfBagsMemo = {}
const colorMap = {}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-7')

  for (const row of textArray) {
    const words = row.split(' ')

    const color = words[0] + words[1]
    const [_, mappedColors] = row.split('contain ')

    const colorsAsWords = mappedColors.split(', ')

    const otherColorsArray = colorsAsWords.reduce((prev, mappedColor) => {
      const data = mappedColor.split(' ')
      const otherColor = {
        displayName: data[1] + data[2],
        numberRequired: parseInt(data[0]),
      }

      if (otherColor.displayName === 'otherbags.') return prev

      return prev.concat(otherColor)
    }, [])

    colorMap[color] = otherColorsArray
  }

  const numberOfBagsInside = (color) => {
    let numberOfBags = 0

    for (const otherColor of colorMap[color]) {
      if (numberOfBagsMemo[otherColor]) {
        const multiplicativeNumber = numberOfBagsMemo[otherColor.displayName]
        numberOfBags += otherColor.numberRequired * multiplicativeNumber
      } else {
        const multiplicativeNumber =
          numberOfBagsInside(otherColor.displayName) + 1
        numberOfBagsMemo[otherColor.displayName] = multiplicativeNumber

        numberOfBags += otherColor.numberRequired * multiplicativeNumber
      }
    }

    return numberOfBags
  }

  return numberOfBagsInside('shinygold')
}

;(() => {
  const result = solution()

  console.log('Day 7 part 2 solution: ', result)
})()
