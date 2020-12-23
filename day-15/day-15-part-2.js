import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const startingNumbers = getTextArrayInputFromFile(
    './datasets/day-15'
  )[0].split(',')

  let turn = startingNumbers.length + 1
  let lastSpoken = R.last(startingNumbers)
  let spokenHash = startingNumbers.reduce((prev, curr, index) => {
    prev[curr] = { turnSpoken: index + 1, numberOfTimes: 1, oldTurn: null }

    return prev
  }, {})

  while (turn < 30000001) {
    if (spokenHash[lastSpoken].numberOfTimes === 1) {
      lastSpoken = 0

      if (!spokenHash[lastSpoken]) {
        spokenHash[lastSpoken] = {
          turnSpoken: turn,
          numberOfTimes: 1,
          oldTurn: null,
        }
      } else {
        spokenHash[lastSpoken].oldTurn = spokenHash[lastSpoken].turnSpoken
        spokenHash[lastSpoken].turnSpoken = turn
        spokenHash[lastSpoken].numberOfTimes++
      }
    } else {
      lastSpoken =
        spokenHash[lastSpoken].turnSpoken - spokenHash[lastSpoken].oldTurn

      if (spokenHash[lastSpoken] !== undefined) {
        spokenHash[lastSpoken].oldTurn = spokenHash[lastSpoken].turnSpoken
        spokenHash[lastSpoken].turnSpoken = turn
        spokenHash[lastSpoken].numberOfTimes++
      } else {
        spokenHash[lastSpoken] = {
          turnSpoken: turn,
          numberOfTimes: 1,
          oldTurn: null,
        }
      }
    }

    turn++

    if (turn % 100000 === 0) console.log(turn)
  }

  return lastSpoken
}

;(() => {
  const result = solution()

  console.log('Day 15 part 2 solution: ', result)
})()
