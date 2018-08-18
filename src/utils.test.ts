import test from 'ava'
import { join } from 'path'
import { getFnDouble } from './test-fixtures'
import { storagePath } from './constants'
import { IFS, IImageSpecs } from './interfaces'
import {
  getPathFactory,
  getFileData,
  maybeMakeDirFactory,
  isCorrectSize,
  isCorrectType
} from './utils'

test('utils::getPathFactory', (t) => {
  const uidFn = getFnDouble('123')
  const getPath = getPathFactory(uidFn)
  t.is(typeof getPath, 'function', 'factory returns a function')

  const path = getPath('foo.png')
  t.is(path, join(storagePath, '123_foo.png'), 'returns correct path')
})

test('utils::getFileData', (t) => {
  const data = {
    image1: {
      name: 'foo.jpg',
      data: Buffer.from(''),
      encoding: '',
      truncated: false,
      mimetype: '',
      md5: '',
      mv: () => {}
    }
  }

  t.is(getFileData(data), data.image1)
})

test('utils::maybeMakeDirFactory calls mkdirSync if existsSync returns false', (t) => {
  let mkdirSyncCalledWith

  const diskUtils: IFS = {
    existsSync: (path: string) => false,
    mkdirSync: (path: string) => {
      mkdirSyncCalledWith = path
    }
  }

  maybeMakeDirFactory(diskUtils)()
  t.is(mkdirSyncCalledWith, storagePath)
})

test('utils::maybeMakeDirFactory does not call mkdirSync if existsSync returns true', (t) => {
  let mkdirSyncCalledWith

  const diskUtils: IFS = {
    existsSync: (path: string) => true,
    mkdirSync: (path: string) => {
      mkdirSyncCalledWith = path
    }
  }

  maybeMakeDirFactory(diskUtils)()
  t.is(mkdirSyncCalledWith, undefined)
})

test('utils::isCorrectSize', (t) => {
  const specs1: IImageSpecs = { width: 350, height: 350, type: 'jpg' }
  const specs2: IImageSpecs = { width: 200, height: 350, type: 'jpg' }
  const specs3: IImageSpecs = { width: 350, height: 200, type: 'jpg' }
  const specs4: IImageSpecs = { width: 5001, height: 350, type: 'jpg' }
  const specs5: IImageSpecs = { width: 350, height: 5001, type: 'jpg' }
  t.true(isCorrectSize(specs1), 'correct size')
  t.false(isCorrectSize(specs2), 'width too small')
  t.false(isCorrectSize(specs3), 'height too small')
  t.false(isCorrectSize(specs4), 'width too big')
  t.false(isCorrectSize(specs5), 'height too big')
})

test('utils::isCorrectType', (t) => {
  t.true(isCorrectType({ width: 1, height: 1, type: 'jpg' }), 'jpg ok')
  t.true(isCorrectType({ width: 1, height: 1, type: 'JPG' }), 'JPG ok')
  t.true(isCorrectType({ width: 1, height: 1, type: 'jpeg' }), 'jpeg ok')
  t.true(isCorrectType({ width: 1, height: 1, type: 'png' }), 'png ok')
  t.false(isCorrectType({ width: 1, height: 1, type: 'gif' }), 'gif not ok')
  t.false(isCorrectType({ width: 1, height: 1, type: 'GIF' }), 'GIF not ok')
})
