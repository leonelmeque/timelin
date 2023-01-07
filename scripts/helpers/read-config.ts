import path from 'path'
import fs from 'fs'

export function readConfig() {
  const configPath = path.join(__dirname, '../', 'config/config.json')

  const config = fs.readFileSync(configPath, { encoding: 'utf8' })

  if (!config.length) {
    console.log('No configuration was found')
    process.exit()
  }

  return JSON.parse(config)
}
