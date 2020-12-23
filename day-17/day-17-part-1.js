import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

let space = []
let activeZones = []

const getAdjacentCount = ({ row, column, depth, symbol = '#' }) => {
  let count = 0

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        if (i === 0 && j === 0 && k === 0) continue

        if (
          space[row + i] &&
          space[row + i][column + j] &&
          space[row + i][column + j][depth + k] === symbol
        )
          count++
      }
    }
  }

  return count
}

const getNearbyInactiveZones = ({ row, column, depth, symbol = '#' }) => {
  let inactiveZones = []
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        if (i === 0 && j === 0 && k === 0) continue

        if (
          !space[row + i] ||
          !space[row + i][column + j] ||
          space[row + i][column + j][depth + k] !== symbol
        ) {
          inactiveZones.push({
            row: row + i,
            column: column + j,
            depth: depth + k,
          })
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
      space[row][column].push(char)

      if (char === '#') activeZones.push({ row, column, depth: 0 })
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
          '' + inactiveZone.row + inactiveZone.column + inactiveZone.depth

        if (!zonesChecked[key] && getAdjacentCount(inactiveZone) === 3) {
          zonesChecked[key] = true
          const { row, column, depth } = inactiveZone

          if (!newSpace[row]) newSpace[row] = []
          if (!newSpace[row][column]) newSpace[row][column] = []
          newSpace[row][column][depth] = '#'
          newActiveZones.push(inactiveZone)
        }
      }

      const activeZoneAdjacentCount = getAdjacentCount(activeZone)
      if (activeZoneAdjacentCount === 2 || activeZoneAdjacentCount === 3) {
        const { row, column, depth } = activeZone
        if (!newSpace[row]) newSpace[row] = []
        if (!newSpace[row][column]) newSpace[row][column] = []
        newSpace[row][column][depth] = '#'
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

  console.log('Day 17 part 1 solution: ', result)
})()
