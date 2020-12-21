import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-12')

  let location = { x: 0, y: 0 }

  let direction = 'east'

  let navChart = ['east', 'south', 'west', 'north']

  for (const value of textArray) {
    const [instruction, unit] = R.splitAt(1, value)

    const unitInt = parseInt(unit)

    let currentIndex = R.indexOf(direction, navChart)

    switch (instruction) {
      case 'N':
        location.y += unitInt
        break
      case 'S':
        location.y -= unitInt
        break
      case 'W':
        location.x -= unitInt
        break
      case 'E':
        location.x += unitInt
        break
      case 'L':
        currentIndex -= unitInt / 90
        currentIndex += 4
        direction = navChart[currentIndex % navChart.length]
        break
      case 'R':
        currentIndex += unitInt / 90
        direction = navChart[currentIndex % navChart.length]
        break
      case 'F':
        switch (direction) {
          case 'east':
            location.x += unitInt
            break
          case 'west':
            location.x -= unitInt
            break
          case 'north':
            location.y += unitInt
            break
          case 'south':
            location.y -= unitInt
            break
        }
        break
    }
  }

  return Math.abs(location.x) + Math.abs(location.y)
}

;(() => {
  const result = solution()

  console.log('Day 12 part 1 solution: ', result)
})()
