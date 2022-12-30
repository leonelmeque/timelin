import { moduleInstaller, wasModuleTypeProvided } from './helpers/utils'

const [type, moduleName] = process.argv.slice(2)

wasModuleTypeProvided(type as never)
moduleInstaller(type as never, moduleName)
