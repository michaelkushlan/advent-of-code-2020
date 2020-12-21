import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

// row by column

const floorSymbol = '.'

const getAdjacentCount = ({ row, column, symbol }, grid) => {
  let count = 0

  let tempI = row
  let tempJ = column

  //look down
  while (true) {
    tempI++

    if (tempI >= grid.length) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look right
  while (true) {
    tempJ++

    if (tempJ > grid[tempI].length) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look up
  while (true) {
    tempI--

    if (tempI < 0) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look left
  while (true) {
    tempJ--

    if (tempJ < 0) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look down left
  while (true) {
    tempI++
    tempJ--

    if (tempJ < 0 || tempI >= grid.length) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look down right
  while (true) {
    tempI++
    tempJ++

    if (tempI >= grid.length || tempJ > grid[tempI].length) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look up right
  while (true) {
    tempI--
    tempJ++

    if (tempI < 0 || tempJ > grid[tempI].length) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

  tempI = row
  tempJ = column

  //look up left
  while (true) {
    tempI--
    tempJ--

    if (tempJ < 0 || tempI < 0) break

    if (grid[tempI][tempJ] === symbol) count++
    if (grid[tempI][tempJ] !== floorSymbol) break
  }

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

            if (numberOfOccupiedAdjacentSeats2 >= 5) {
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

  console.log('Day 11 part 2 solution: ', result)
})()
