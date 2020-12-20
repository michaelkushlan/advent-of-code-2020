import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-3')
  const treeMap = textArray.map((text) => text.split(''))

  const calculateTreesHit = (slopeValue, skipValue = 1) => {
    let location = 0
    let treesHit = 0

    for (let i = 0; i < treeMap.length; i += skipValue) {
      if (treeMap[i][location % treeMap[i].length] === '#') treesHit++

      location += slopeValue
    }

    return treesHit
  }

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  return R.reduce(
    (prev, slope) => {
      return prev * calculateTreesHit(slope[0], slope[1])
    },
    1,
    slopes
  )
}

;(() => {
  const solution = part1Solution()

  console.log('Day 3 part 2 solution: ', solution)
})()
