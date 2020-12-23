import * as R from 'ramda'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const textArray = getTextArrayInputFromFile('./datasets/day-16')

  let validNumbers = new Set()

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

  for (const rule of rules) {
    let numberData = R.split(': ', rule)[1]
    let [rule1, rule2] = R.split(' or ', numberData)
    let [start1, end1] = R.split('-', rule1)
    let [start2, end2] = R.split('-', rule2)

    let numStart1 = parseInt(start1)
    let numEnd1 = parseInt(end1)
    let numStart2 = parseInt(start2)
    let numEnd2 = parseInt(end2)

    let rangeOfNumbers1 = R.range(numStart1, numEnd1 + 1)
    let rangeOfNumbers2 = R.range(numStart2, numEnd2 + 1)

    for (const number of rangeOfNumbers1) {
      validNumbers.add(number)
    }
    for (const number of rangeOfNumbers2) {
      validNumbers.add(number)
    }
  }

  nearbyTickets = R.tail(nearbyTickets)

  let invalidNumbers = []

  for (let i = 0; i < nearbyTickets.length; i++) {
    let nearbyTicket = nearbyTickets[i]
    let ticketNumbers = R.compose(R.map(parseInt), R.split(','))(nearbyTicket)

    for (const number of ticketNumbers) {
      if (!validNumbers.has(number)) {
        nearbyTickets = R.remove(i, 1, nearbyTickets)
        i--
        break
      }
    }
  }

  console.log(nearbyTickets)
  return R.sum(invalidNumbers)
}

;(() => {
  const result = solution()

  console.log('Day 16 part 1 solution: ', result)
})()
