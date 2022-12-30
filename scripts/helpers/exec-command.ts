import { exec } from 'node:child_process'
import { BUILD_TOOL_COMMAND } from './constants'

type Actions = 'build' | 'install' | 'dev' | 'serve'
type PackageType = 'app' | 'package'

export function execCommand(
  command: Actions,
  moduleType: PackageType,
  moduleName: string
) {
  exec(
    `${BUILD_TOOL_COMMAND} @todo/${moduleName} ${command}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(
          `There was an error building the ${moduleType} ${moduleName}`
        )
        console.log(stderr)
      }

      console.log(stdout)
    }
  )
}
