#!/usr/bin/env ts-node
import chalk from 'chalk'
import fs from 'fs'
import { fetch, logger, logResult } from './utils'

/**
 * Save local file to Gist
 * Overwites file if already exists in the given gistID
 */
async function updateGist(content: string, remoteFile: string, gistID: string) {
  const body = JSON.stringify({
    files: {
      [remoteFile]: {
        content,
        filename: remoteFile
      }
    }
  })
  // console.log('uplaoding', body)
  const { body: responseBody, status } = await fetch(`/gists/${gistID}`, {
    body,
    method: 'PATCH'
  })
  logResult(status, responseBody)
}

const gistIDArg = process.argv[2]
const remoteFileName = process.argv[3]
const stdin = fs.readFileSync(0).toString()

console.log(
  `${chalk.blue(
    'Uploading the following content to remote file '
  )} ${chalk.yellow(remoteFileName)}`
)

logger.debug(stdin.slice(0, 75), '...')

updateGist(stdin, remoteFileName, gistIDArg)
