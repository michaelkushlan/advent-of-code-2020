import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-8')

  const instructions = textArray.map((row) => {
    const [instruction, number] = row.split(' ')

    return {
      instruction,
      number: parseInt(number),
    }
  })

  let accumulator = 0
  let visited = {}
  let index = 0

  while (true) {
    if (visited[index]) {
      console.log('looping')
      return accumulator
    }

    visited[index] = true

    switch (instructions[index].instruction) {
      case 'nop':
        index++
        break
      case 'acc':
        accumulator += instructions[index].number
        index++
        break
      case 'jmp':
        index += instructions[index].number
        break
    }
  }
}

;(() => {
  const result = solution()

  console.log('Day 8 part 1 solution: ', result)
})()
