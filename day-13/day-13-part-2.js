import * as R from 'ramda'

import bignum from 'bignum'
import { crt_bignum } from 'nodejs-chinese-remainder'

import { getTextArrayInputFromFile } from '../datasets/utils.js'

const solution = () => {
  const [_, busIds] = getTextArrayInputFromFile('./datasets/day-13')

  const betterBusData = R.compose(R.map(parseInt), R.split(','))(busIds)

  const moreData = R.sort(
    (a, b) => b.value - a.value,
    R.reject(
      R.propEq('value', NaN),
      betterBusData.map((data, index) => {
        return {
          value: data,
          index,
        }
      })
    )
  )

  const left = moreData.map((data) => {
    if (data.index === 0) return bignum(0)

    return bignum(data.value - data.index)
  })

  const right = moreData.map((data) => {
    return bignum(data.value)
  })

  return crt_bignum(left, right).toString()
}

;(() => {
  const result = solution()

  console.log('Day 13 part 2 solution: ', result)
})()
