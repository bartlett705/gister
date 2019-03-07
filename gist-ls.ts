#!/usr/bin/env ts-node
import chalk from 'chalk'
import { fetch } from './utils'
async function listGists() {
  const { body } = await fetch('/gists')
  body.map((i: any) => {
    // pull out the full response for one file
    // for inspecting the gist object in case we want to add more to the output or w/e
    // if (i.files['chompskify.html']) {
    //   console.log(JSON.stringify(i, null, 2))
    // }
    console.log(
      `${i.id} (${
        i.public ? chalk.greenBright('public') : chalk.bgRedBright('private')
      }):`,
      Object.keys(i.files)
    )
  })
}

listGists()
