import { p } from '../lib/fns'
import { buildScripts } from '../index'
import gulp from '../gulp'
import npm from '../npm'
import keys from '../keys'
import copy from './copy'
import makeTemplate from './template'
import log from '../lib/log'

export default async function build() {
  log('Building extras, assets...')

  copy.assets()

  log('Building extras, template...')
  makeTemplate()

  log('Building extras, npm...')
  await *[
    npm.install(true),
    npm.bundleInternals()
  ]

  log('Building extras, copy...')
  await *[
    copy.flint(),
    copy.react(),
    copy.app()
  ]
}
