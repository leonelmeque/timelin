import path from 'path'
import fs from 'node:fs'
import { APP_PATH } from './constants'

export function readApp(appName: string) {
  const appPath = path.join(__dirname, '../../', `${APP_PATH}${appName}`)

  fs.readdir(appPath, (err) => {
    if (err) {
      console.error(`There was an error while reading the app named ${appName}`)
      console.error(err.message)
      process.exit()
    }
    console.info(`App found succesfully...`)
  })
}
