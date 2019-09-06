
const target = process.env.NODE_ENV !== 'development' ? 'Release' : 'Debug'
export const Addon = require(`../build/${target}/addon.node`)
