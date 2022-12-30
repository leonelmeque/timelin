import { moduleBuilder, wasModuleTypeProvided } from './helpers/utils'

const [type, moduleName] = process.argv.slice(2)

wasModuleTypeProvided(type as never)
moduleBuilder(type as never, moduleName)
