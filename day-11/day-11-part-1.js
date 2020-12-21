import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

// row by column

const getAdjacentCount = ({ row, column, symbol }, grid) => {
  if (row === 0) {
    let count = 0

    if (grid[row + 1][column] === symbol) count++
    if (grid[row + 1][column + 1] === symbol) count++
    if (grid[row + 1][column - 1] === symbol) count++
    if (grid[row][column - 1] === symbol) count++
    if (grid[row][column + 1] === symbol) count++

    return count
  }

  if (row === grid.length - 1) {
    let count = 0

    if (grid[row - 1][column] === symbol) count++
    if (grid[row - 1][column + 1] === symbol) count++
    if (grid[row - 1][column - 1] === symbol) count++
    if (grid[row][column - 1] === symbol) count++
    if (grid[row][column + 1] === symbol) count++

    return count
  }

  let count = 0

  if (grid[row + 1][column] === symbol) count++
  if (grid[row + 1][column + 1] === symbol) count++
  if (grid[row + 1][column - 1] === symbol) count++
  if (grid[row - 1][column] === symbol) count++
  if (grid[row - 1][column + 1] === symbol) count++
  if (grid[row - 1][column - 1] === symbol) count++
  if (grid[row][column - 1] === symbol) count++
  if (grid[row][column + 1] === symbol) count++

  return count
}

const printGrid = (grid) => {
  for (const row of grid) {
    let subString = row.join(' ')
    console.log(subString)
  }
}

const calcGridHash = (grid) => {
  let string = ''
  for (const row of grid) {
    let subString = row.join(' ')
    string += subString
  }

  return string
}

const countSymbol = ({ symbol, grid }) => {
  let count = 0

  for (const row of grid) {
    for (const value of row) {
      if (value === symbol) count++
    }
  }

  return count
}

let gridHash = {}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-11')

  let twoDimensionalGrid = textArray.map((row) => row.split(''))

  while (true) {
    const hash = calcGridHash(twoDimensionalGrid)
    if (gridHash[hash]) break
    gridHash[hash] = true

    let newGrid = []

    for (let i = 0; i < twoDimensionalGrid.length; i++) {
      newGrid.push([])
      for (let j = 0; j < twoDimensionalGrid[i].length; j++) {
        switch (twoDimensionalGrid[i][j]) {
          case 'L':
            let numberOfOccupiedAdjacentSeats = getAdjacentCount(
              { row: i, column: j, symbol: '#' },
              twoDimensionalGrid
            )

            if (numberOfOccupiedAdjacentSeats === 0) {
              newGrid[i][j] = '#'
            } else {
              newGrid[i][j] = 'L'
            }

            break
          case '#':
            let numberOfOccupiedAdjacentSeats2 = getAdjacentCount(
              { row: i, column: j, symbol: '#' },
              twoDimensionalGrid
            )

            if (numberOfOccupiedAdjacentSeats2 >= 4) {
              newGrid[i][j] = 'L'
            } else {
              newGrid[i][j] = '#'
            }

            break
          case '.':
            newGrid[i][j] = '.'
        }
      }
    }

    twoDimensionalGrid = newGrid
  }

  return countSymbol({ symbol: '#', grid: twoDimensionalGrid })
}

;(() => {
  const result = solution()

  console.log('Day 11 part 1 solution: ', result)
})()
