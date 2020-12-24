import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

let space = []
let activeZones = []

const getAdjacentCount = ({ row, column, depth, time, symbol = '#' }) => {
  let count = 0

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        for (let t = -1; t < 2; t++) {
          if (i === 0 && j === 0 && k === 0 && t === 0) continue

          if (
            space[row + i] &&
            space[row + i][column + j] &&
            space[row + i][column + j][depth + k] &&
            space[row + i][column + j][depth + k][time + t] === symbol
          )
            count++
        }
      }
    }
  }

  return count
}

const getNearbyInactiveZones = ({ row, column, depth, time, symbol = '#' }) => {
  let inactiveZones = []
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        for (let t = -1; t < 2; t++) {
          if (i === 0 && j === 0 && k === 0) continue

          if (
            !space[row + i] ||
            !space[row + i][column + j] ||
            !space[row + i][column + j][depth + k] ||
            space[row + i][column + j][depth + k][time + t] !== symbol
          ) {
            inactiveZones.push({
              row: row + i,
              column: column + j,
              depth: depth + k,
              time: time + t,
            })
          }
        }
      }
    }
  }

  return inactiveZones
}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-17')

  textArray.map((textArrayRow, row) => {
    let data = textArrayRow.split('')
    data.map((char, column) => {
      if (!space[row]) space[row] = []
      if (!space[row][column]) space[row][column] = []
      if (!space[row][column][0]) space[row][column][0] = []

      space[row][column][0].push(char)

      if (char === '#') activeZones.push({ row, column, depth: 0, time: 0 })
    })
  })

  const cycleLength = 6

  for (let i = 0; i < cycleLength; i++) {
    let newSpace = []
    let newActiveZones = []
    let zonesChecked = {}

    for (const activeZone of activeZones) {
      let nearbyInactiveZones = getNearbyInactiveZones(activeZone, space)
      for (const inactiveZone of nearbyInactiveZones) {
        let key =
          '' +
          inactiveZone.row +
          inactiveZone.column +
          inactiveZone.depth +
          inactiveZone.time

        if (!zonesChecked[key] && getAdjacentCount(inactiveZone) === 3) {
          zonesChecked[key] = true
          const { row, column, depth, time } = inactiveZone

          if (!newSpace[row]) newSpace[row] = []
          if (!newSpace[row][column]) newSpace[row][column] = []
          if (!newSpace[row][column][depth]) newSpace[row][column][depth] = []

          newSpace[row][column][depth][time] = '#'
          newActiveZones.push(inactiveZone)
        }
      }

      const activeZoneAdjacentCount = getAdjacentCount(activeZone)
      if (activeZoneAdjacentCount === 2 || activeZoneAdjacentCount === 3) {
        const { row, column, depth, time } = activeZone
        if (!newSpace[row]) newSpace[row] = []
        if (!newSpace[row][column]) newSpace[row][column] = []
        if (!newSpace[row][column][depth]) newSpace[row][column][depth] = []

        newSpace[row][column][depth][time] = '#'
        newActiveZones.push(activeZone)
      }
    }

    space = newSpace
    activeZones = newActiveZones
  }

  return activeZones.length
}

;(() => {
  const result = solution()

  console.log('Day 17 part 2 solution: ', result)
})()
