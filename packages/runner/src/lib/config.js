import opts from '../opts'
import log from './log'
import handleError from './handleError'
import wport from './wport'
import { readJSON, writeJSON } from './fns'

let OPTS

export async function readConfig() {
  return await readJSON(opts.get('configFile'))
}

// prompts for domain they want to use
export async function writeConfig(config) {
  if (!config) return console.error("Must provide a config to write")

  try {
    await writeJSON(opts.get('configFile'), config, { spaces: 2 })
  }
  catch(e) {
    handleError(e)
  }
}

export async function initConfig() {
  let config

  try {
    config = await readConfig()
  }
  catch(e) {
    config = { port: wport() }
    opts.set('config', config)
    await writeConfig(config)
  }

  return config
}