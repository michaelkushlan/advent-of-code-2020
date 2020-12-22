import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const [earliestDepartureTime, busIds] = getTextArrayInputFromFile(
    './datasets/day-13'
  )

  const betterBusData = R.compose(
    R.map(parseInt),
    R.reject(R.equals('x')),
    R.split(',')
  )(busIds)

  let shortestWaitTime = Infinity
  let busToTake

  for (const busId of betterBusData) {
    let remainder = earliestDepartureTime % busId

    if (remainder === 0) return 0

    let waitTime = busId - remainder

    if (waitTime < shortestWaitTime) {
      shortestWaitTime = waitTime
      busToTake = busId
    }
  }

  return shortestWaitTime * busToTake
}

;(() => {
  const result = solution()

  console.log('Day 13 part 1 solution: ', result)
})()
