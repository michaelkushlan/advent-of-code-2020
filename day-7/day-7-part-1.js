import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const containsGoldMap = {}
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
      const otherColor = data[1] + data[2]

      if (otherColor === 'otherbags.') return prev

      return prev.concat(otherColor)
    }, [])

    colorMap[color] = otherColorsArray
  }

  let numberOfBagsContainShinyGold = 0

  for (const color of Object.keys(colorMap)) {
    if (hasGold(color)) numberOfBagsContainShinyGold++
  }

  return numberOfBagsContainShinyGold
}

const hasGold = (color) => {
  if (R.includes('shinygold', colorMap[color])) {
    containsGoldMap[color] = true
    return true
  }

  for (const otherColor of colorMap[color]) {
    if (containsGoldMap[color] || hasGold(otherColor)) {
      containsGoldMap[color] = true
      return true
    }
  }

  return false
}

;(() => {
  const result = solution()

  console.log('Day 7 part 1 solution: ', result)
})()
