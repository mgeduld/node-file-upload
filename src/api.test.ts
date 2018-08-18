import test from 'ava'
import { uploadAPIFactory, pathsAPIFactory } from './api'
import { IRequest, IResponse, IFS } from './interfaces'
import { getFnDouble, getAsyncFnDouble } from './test-fixtures'

test('uploadAPIFactory', (t) => {
  const maybeMakeDir = getFnDouble()
  const storeImage = getAsyncFnDouble()
  const uploadAPI = uploadAPIFactory(maybeMakeDir, storeImage)
  const req: IRequest = { files: {} }
  const res: IResponse = { json: (value: any) => Promise.resolve(value) }
  uploadAPI(req, res)
  t.is(typeof uploadAPI, 'function')
})

test('pathsAPIFactory finds directory and images', (t) => {
  let jsonCalledWith
  const diskUtils: IFS = {
    existsSync: (path: string) => true,
    readdirSync: (path: string) => ['foo.png', 'bar.jpg']
  }
  const req: IRequest = {}
  const res: IResponse = {
    json: (value) => {
      jsonCalledWith = value
      return Promise.resolve(value)
    }
  }
  pathsAPIFactory(diskUtils)(req, res)
  t.deepEqual(jsonCalledWith, { images: ['foo.png', 'bar.jpg'] })
})

test('pathsAPIFactory finds directory but no images images', (t) => {
  let jsonCalledWith
  const diskUtils: IFS = {
    existsSync: (path: string) => true,
    readdirSync: (path: string) => undefined
  }
  const req: IRequest = {}
  const res: IResponse = {
    json: (value) => {
      jsonCalledWith = value
      return Promise.resolve(value)
    }
  }
  pathsAPIFactory(diskUtils)(req, res)
  t.deepEqual(jsonCalledWith, { images: [] })
})

test('pathsAPIFactory does not find directory', (t) => {
  let jsonCalledWith
  const diskUtils: IFS = {
    existsSync: (path: string) => false,
    readdirSync: (path: string) => undefined
  }
  const req: IRequest = {}
  const res: IResponse = {
    json: (value) => {
      jsonCalledWith = value
      return Promise.resolve(value)
    }
  }
  pathsAPIFactory(diskUtils)(req, res)
  t.deepEqual(jsonCalledWith, { images: [] })
})
