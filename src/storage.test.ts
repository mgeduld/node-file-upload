import test from 'ava'
import { storeImage } from './storage'
import { IFileDatum } from './interfaces'
import { getAsyncFnDouble } from './test-fixtures'

test('storeImage', (t) => {
  let mvCalledWith
  const fileData: IFileDatum = {
    name: 'foo.png',
    data: Buffer.from(''),
    encoding: '',
    truncated: false,
    mimetype: '',
    md5: 'string',
    mv: (path, callback) => {
      mvCalledWith = path
      callback()
    }
  }

  storeImage(fileData)
  t.true(/foo\.png/.test(mvCalledWith))
})
