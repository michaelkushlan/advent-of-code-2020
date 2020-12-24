import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const processNumber = (numberAsString, stack) => {
  let prevValue = stack.pop()
  let number = parseInt(numberAsString)

  if (prevValue === undefined) {
    return stack.push(number)
  }
  if (prevValue === '(') {
    stack.push('(')
    stack.push(number)
    return
  }
  if (prevValue === '*') {
    let valueToMultiply = stack.pop()
    stack.push(valueToMultiply * number)
    return
  }
  if (prevValue === '+') {
    let valueToAdd = stack.pop()
    stack.push(valueToAdd + number)
    return
  }
}

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-18')

  let sum = 0

  for (const row of textArray) {
    let rowData = row.split(' ')
    let stack = []

    for (let value of rowData) {
      if (value === '*') {
        stack.push(value)
        continue
      }
      if (value === '+') {
        stack.push(value)
        continue
      }
      if (value[0] === '(') {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === '(') {
            stack.push('(')
          } else {
            stack.push(parseInt(value.substring(i)))
          }
        }

        continue
      }

      if (R.last(value) === ')') {
        let [numberAsString, closeParens] = R.splitWhen(R.equals(')'), value)

        processNumber(numberAsString, stack)
        R.map(() => {
          let number = stack.pop()
          stack.pop()
          processNumber(number, stack)
        }, closeParens)

        value = stack.pop().toString()
      }

      processNumber(value, stack)
    }

    sum += R.last(stack)
  }

  return sum
}

;(() => {
  const result = solution()

  console.log('Day 18 part 1 solution: ', result)
})()
