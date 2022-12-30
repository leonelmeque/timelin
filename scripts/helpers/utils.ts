import { execCommand } from './exec-command'
import { readApp } from './read-app'
import { readPackage } from './read-package'

type PackageType = 'package' | 'app'

export function wasModuleTypeProvided(type: PackageType) {
  if (!type) {
    console.error('No module type was provided in arguments')
    process.exit()
  }

  if (type !== 'package' && type !== 'app') {
    console.error(
      `Wrong module type, modules in the project are package/app, you provided ${type}`
    )
    process.exit()
  }
}

export function moduleBuilder(type: PackageType, moduleName: string) {
  if (type === 'package') {
    readPackage(moduleName)
    execCommand('build', type, moduleName)
  } else if (type === 'app') {
    readApp(moduleName)
    execCommand('build', type, moduleName)
  }
}

export function moduleInstaller(type: PackageType, moduleName: string) {
  if (type === 'package') {
    readPackage(moduleName)
    execCommand('install', type, moduleName)
  } else if (type === 'app') {
    readApp(moduleName)
    execCommand('install', type, moduleName)
  }
}
