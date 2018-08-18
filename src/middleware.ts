import sizeOf = require('image-size')
import { ErrorMessage } from './error-message'
import { IRequest, IResponse } from './interfaces'
import { getFileData, isCorrectSize, isCorrectType } from './utils'

export const hasImage: any = (
  req: IRequest,
  res: IResponse,
  next: Function
) => {
  if (!req.files) {
    next(new Error(ErrorMessage.noImageFile))
  } else {
    next()
  }
}

export const isValidImageFactory: any = (sizeOf: Function) => (
  req: IRequest,
  res: IResponse,
  next: Function
) => {
  const fileData = getFileData(req.files)
  const specs = sizeOf(fileData.data)
  if (!isCorrectSize(specs)) {
    next(new Error(ErrorMessage.badDimensions))
  } else if (!isCorrectType(specs)) {
    next(new Error(ErrorMessage.badType))
  } else {
    next()
  }
}

export const isValidImage = isValidImageFactory(sizeOf)
