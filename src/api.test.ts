import test from 'ava'
import { uploadAPIFactory } from './api'
import { IRequest, IResponse } from './interfaces'
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
