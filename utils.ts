import chalk from 'chalk'
import dotenv from 'dotenv'
import nodeFetch, { RequestInit } from 'node-fetch'
dotenv.config({})

const githubKey = process.env.GITHUB_KEY
export const apiBaseURI = 'https://api.github.com'
const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${githubKey}`,
  'Content-Type': 'application/json'
}

export const fetch = async (endpoint: string, init?: RequestInit) => {
  const res = await nodeFetch(`${apiBaseURI}${endpoint}`, { headers, ...init })
  return { body: await res.json(), status: res.status }
}

export const logger = process.env.PRODUCTION
  ? console
  : {
      debug: (...args: any) => console.log(chalk.blueBright(...args)),
      error: (...args: any) => console.log(chalk.redBright(...args)),
      info: (...args: any) => console.log(chalk.greenBright(...args)),
      log: (...args: any) => console.log(chalk.white(...args)),
      warn: (...args: any) => console.log(chalk.yellowBright(...args))
    }
export function logResult(status: number, body: any) {
  if (status === 200) {
    logger.info('Good shit 👍')
  } else {
    logger.error('Whoa :/', status, JSON.stringify(body))
  }
}
