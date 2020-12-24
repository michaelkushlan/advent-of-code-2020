import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const processNumber = (numberAsString, stack, squish) => {
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
  if (prevValue === '*' && squish) {
    let valueToMultiply = stack.pop()
    stack.push(valueToMultiply * number)
    return
  }
  if (prevValue === '*') {
    stack.push('*')
    stack.push(number)
  }
  if (prevValue === '+') {
    let valueToAdd = stack.pop()
    stack.push(valueToAdd + number)
    return
  }
}

const collapseStack = (stack) => {
  while (stack.length !== 1 && stack[stack.length - 2] !== '(') {
    let value = stack.pop()
    processNumber(value, stack, true)
  }

  if (stack[stack.length - 2] === '(') {
    let value = stack.pop()
    stack.pop()
    processNumber(value, stack)
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
          collapseStack(stack)
        }, closeParens)

        value = stack.pop().toString()
      }

      processNumber(value, stack)
    }

    collapseStack(stack)

    sum += stack[0]
  }

  return sum
}

;(() => {
  const result = solution()

  console.log('Day 18 part 1 solution: ', result)
})()
