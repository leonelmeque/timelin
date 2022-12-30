import path from 'path'
import fs from 'node:fs'
import { PACKAGE_PATH } from './constants'

export function readPackage(packageName: string) {
  const packagePath = path.join(
    __dirname,
    '../../',
    `${PACKAGE_PATH}${packageName}`
  )

  fs.readdir(packagePath, (err) => {
    if (err) {
      console.error(`Package with name "${packageName}" does not exit`)
      process.exit()
    }
    console.info(`Package found succesfully...`)
  })
}
