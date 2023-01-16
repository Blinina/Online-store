import { string } from "yup"

export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const getNewPrice = (price: number, sales: number) => (price * (1 - sales / 100)).toFixed(2)

export const getNormalText = (text: string) => text.split('\n').map((str: string, i: number) => <p key={`p_${i}`}>{str}</p>)

type typeObjStars = {
  [key: string]: string
}
export const drawRating = (rating: number) => {
  const objStars: typeObjStars = {
    '1': '❤️🤍🤍🤍🤍',
    '2': '❤️❤️🤍🤍🤍',
    '3': '❤️❤️❤️🤍🤍',
    '4': '❤️❤️❤️❤️🤍',
    '5': '❤️❤️❤️❤️❤️'
  }
  return objStars[String(Math.round(rating))]
}
export const buildName = (str: string) => {
  const firstVersion = str.split(' ').slice(0, 3).join(' ')
  return firstVersion.length > 20 ? `${str.split(' ').slice(0, 2).join(' ')}...` : `${firstVersion}...`
}

// npx stylelint src/style/scss/normalize.scss --fix .
