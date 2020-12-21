import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-12')

  let location = { x: 0, y: 0 }
  let waypoint = { x: 10, y: 1 }

  for (const value of textArray) {
    const [instruction, unit] = R.splitAt(1, value)

    const unitInt = parseInt(unit)

    switch (instruction) {
      case 'N':
        waypoint.y += unitInt
        break
      case 'S':
        waypoint.y -= unitInt
        break
      case 'W':
        waypoint.x -= unitInt
        break
      case 'E':
        waypoint.x += unitInt
        break
      case 'L':
        switch (unitInt) {
          case 90:
            let tmpWaypoint1 = { y: waypoint.x, x: -waypoint.y }
            waypoint = tmpWaypoint1
            break
          case 180:
            let tmpWaypoint2 = { y: -waypoint.y, x: -waypoint.x }
            waypoint = tmpWaypoint2
            break
          case 270:
            let tmpWaypoint3 = { y: -waypoint.x, x: waypoint.y }
            waypoint = tmpWaypoint3
            break
        }
        break

      case 'R':
        switch (unitInt) {
          case 90:
            let tmpWaypoint1 = { y: -waypoint.x, x: waypoint.y }
            waypoint = tmpWaypoint1
            break
          case 180:
            let tmpWaypoint2 = { y: -waypoint.y, x: -waypoint.x }
            waypoint = tmpWaypoint2
            break
          case 270:
            let tmpWaypoint3 = { y: waypoint.x, x: -waypoint.y }
            waypoint = tmpWaypoint3
            break
        }
        break
      case 'F':
        location.x += unitInt * waypoint.x
        location.y += unitInt * waypoint.y
        break
    }
  }

  return Math.abs(location.x) + Math.abs(location.y)
}

;(() => {
  const result = solution()

  console.log('Day 12 part 2 solution: ', result)
})()
