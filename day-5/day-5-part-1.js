import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-5')

  let seatIds = []

  for (const seat of textArray) {
    let rowBinary = ''
    let columnBinary = ''

    for (let i = 0; i < seat.length; i++) {
      if (i < 7) {
        if (seat[i] === 'B') rowBinary = rowBinary.concat('1')
        if (seat[i] === 'F') rowBinary = rowBinary.concat('0')
      } else {
        if (seat[i] === 'L') columnBinary = columnBinary.concat('0')
        if (seat[i] === 'R') columnBinary = columnBinary.concat('1')
      }
    }

    const rowInt = parseInt(rowBinary, 2)
    const columnInt = parseInt(columnBinary, 2)

    const seatId = rowInt * 8 + columnInt

    seatIds.push(seatId)
  }

  return R.apply(Math.max, seatIds)
}

;(() => {
  const result = solution()

  console.log('Day 5 part 1 solution: ', result)
})()
