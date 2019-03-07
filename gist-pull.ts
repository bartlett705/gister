#!/usr/bin/env ts-node
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { fetch, logResult } from './utils'

const oneGistID = '25679274bc90208aa46887e09eea37e7'

/**
 * Save a remote gist locally
 */
async function saveGist(
  /** Local path to save to */
  localPath: string,
  /** Remote Gist ID to save */
  gistID: string
) {
  const { body, status } = await fetch(`/gists/${gistID}`)
  logResult(status, body)

  const { files } = body
  if (status !== 200 || !files) {
    return
  }

  for (const file of Object.keys(files)) {
    const { content, filename } = files[file]
    console.log(filename)
    const newFilePath = path.join(localPath, filename)
    console.log(newFilePath)
    fs.writeFileSync(newFilePath, content)
    console.log(chalk.yellowBright('Wrote ', filename))
  }
}

saveGist(process.argv[3], process.argv[2])
