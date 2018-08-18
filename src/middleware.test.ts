import test from 'ava'
import { hasImage, isValidImageFactory } from './middleware'
import { IRequest } from './interfaces'
import { ErrorMessage } from './error-message'

test('middleware::hasImage with files', (t) => {
  let nextCalledWith
  const req: IRequest = {
    files: {}
  }
  const next = (value: any) => {
    nextCalledWith = value
  }
  hasImage(req, {}, next)
  t.is(nextCalledWith, undefined)
})

test('middleware::hasImage without files', (t) => {
  let nextCalledWith
  const req: IRequest = {
    files: undefined
  }
  const next = (value: any) => {
    nextCalledWith = value
  }
  hasImage(req, {}, next)
  t.deepEqual(nextCalledWith, new Error(ErrorMessage.noImageFile))
})

test('middleware::isValidImageFactory calls next without error for valid image', (t) => {
  let nextCalledWith
  const sizeOf = () => ({ width: 350, height: 350, type: 'jpg' })
  const res = {}
  const req: IRequest = {
    files: {
      image1: {
        name: '',
        data: Buffer.from(''),
        encoding: '',
        truncated: false,
        mimetype: '',
        md5: '',
        mv: () => {}
      }
    }
  }
  const next = (value: any) => {
    nextCalledWith = value
  }
  isValidImageFactory(sizeOf)(req, res, next)
  t.is(nextCalledWith, undefined)
})

test('middleware::isValidImageFactory calls next with error when dimensions are wrong', (t) => {
  let nextCalledWith
  const sizeOf = () => ({ width: 1, height: 350, type: 'jpg' })
  const res = {}
  const req: IRequest = {
    files: {
      image1: {
        name: '',
        data: Buffer.from(''),
        encoding: '',
        truncated: false,
        mimetype: '',
        md5: '',
        mv: () => {}
      }
    }
  }
  const next = (value: any) => {
    nextCalledWith = value
  }
  isValidImageFactory(sizeOf)(req, res, next)
  t.deepEqual(nextCalledWith, new Error(ErrorMessage.badDimensions))
})

test('middleware::isValidImageFactory calls next with error when image type is wrong', (t) => {
  let nextCalledWith
  const sizeOf = () => ({ width: 350, height: 350, type: 'gif' })
  const res = {}
  const req: IRequest = {
    files: {
      image1: {
        name: '',
        data: Buffer.from(''),
        encoding: '',
        truncated: false,
        mimetype: '',
        md5: '',
        mv: () => {}
      }
    }
  }
  const next = (value: any) => {
    nextCalledWith = value
  }
  isValidImageFactory(sizeOf)(req, res, next)
  t.deepEqual(nextCalledWith, new Error(ErrorMessage.badType))
})
