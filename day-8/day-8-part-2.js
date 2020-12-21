import { getTextArrayInputFromFile } from '../datasets/utils.js'
const runProgram = (instructions) => {
  let accumulator = 0
  let visited = {}
  let index = 0

  while (true) {
    if (index === instructions.length) return accumulator

    if (visited[index]) {
      return false
    }

    visited[index] = true

    switch (instructions[index].operation) {
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

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-8')

  const instructions = textArray.map((row) => {
    const [operation, number] = row.split(' ')

    return {
      operation,
      number: parseInt(number),
    }
  })

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]

    if (instruction.operation === 'jmp') {
      const instructionClone = instructions.map((instruction, index) => {
        if (index === i)
          return {
            operation: 'nop',
            number: instruction.number,
          }

        return instruction
      })

      const value = runProgram(instructionClone)

      if (value !== false) return value
    } else if (instruction.operation === 'nop') {
      const instructionClone = instructions.map((instruction, index) => {
        if (index === i)
          return {
            operation: 'jmp',
            number: instruction.number,
          }

        return instruction
      })

      const value = runProgram(instructionClone)

      if (value !== false) return value
    }
  }
}

;(() => {
  const result = solution()

  console.log('Day 8 part 2 solution: ', result)
})()
