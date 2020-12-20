import { getTextArrayInputFromFile } from '../datasets/utils.js'

const part1Solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-3')
  const treeMap = textArray.map((text) => text.split(''))

  let location = 0
  let treesHit = 0

  for (const row of treeMap) {
    if (row[location % row.length] === '#') treesHit++

    location += 3
  }

  return treesHit
}

;(() => {
  const solution = part1Solution()

  console.log('Day 3 part 1 solution: ', solution)
})()
