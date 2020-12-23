import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-16')

  let [rules, yourTicket, nearbyTickets] = R.reduce(
    (prev, curr) => {
      if (curr === '') {
        prev.push([])
      } else {
        R.last(prev).push(curr)
      }

      return prev
    },
    [[]],
    textArray
  )

  let listedRules = []
  let validNumbers = new Set()

  for (const rule of rules) {
    let [ruleName, numberData] = R.split(': ', rule)
    let [rule1, rule2] = R.split(' or ', numberData)
    let [start1, end1] = R.split('-', rule1)
    let [start2, end2] = R.split('-', rule2)

    let numStart1 = parseInt(start1)
    let numEnd1 = parseInt(end1)
    let numStart2 = parseInt(start2)
    let numEnd2 = parseInt(end2)

    let rangeOfNumbers1 = R.range(numStart1, numEnd1 + 1)
    let rangeOfNumbers2 = R.range(numStart2, numEnd2 + 1)

    listedRules.push({
      key: ruleName,
      numbers: rangeOfNumbers1.concat(rangeOfNumbers2),
    })

    R.last(listedRules).numbers.map((value) => validNumbers.add(value))
  }

  nearbyTickets.push(yourTicket[1])
  nearbyTickets.shift()

  let validTickets = []

  for (const nearbyTicket of nearbyTickets) {
    let valid = true
    let ticketNumbers = R.map(parseInt, R.split(',', nearbyTicket))
    for (const number of ticketNumbers) {
      if (!validNumbers.has(number)) {
        valid = false
        break
      }
    }

    if (valid) validTickets.push(ticketNumbers)
  }

  let ordered = {}

  for (const rule of listedRules) {
    for (let i = 0; i < validTickets[0].length; i++) {
      let validProperty = true

      for (const validTicket of validTickets) {
        if (!R.includes(validTicket[i], rule.numbers)) {
          validProperty = false
          break
        }
      }

      if (validProperty) {
        if (ordered[rule.key]) {
          ordered[rule.key].push(i)
        } else {
          ordered[rule.key] = [i]
        }
      }
    }
  }

  let i = 0
  let removedNumbers = {}

  while (true) {
    let numberToRemove
    for (const key of Object.keys(ordered)) {
      if (ordered[key].length === 1 && !removedNumbers[ordered[key][0]]) {
        numberToRemove = ordered[key][0]
        removedNumbers[numberToRemove] = true
        break
      }
    }
    for (const key of Object.keys(ordered)) {
      if (ordered[key].length !== 1)
        ordered[key] = R.reject(R.equals(numberToRemove), ordered[key])
    }

    if (Object.keys(removedNumbers).length === Object.keys(ordered).length)
      break
  }

  let multiply = 1

  for (const key of Object.keys(ordered)) {
    if (key.includes('departure')) {
      const yourTicketNumber = R.last(validTickets)[ordered[key][0]]

      multiply *= yourTicketNumber
    }
  }

  return multiply
}
;(() => {
  const result = solution()

  console.log('Day 16 part 2 solution: ', result)
})()
