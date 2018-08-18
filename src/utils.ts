import uuidv4 = require('uuid/v4')
import * as fs from 'fs'
import { join } from 'path'
import {
  storagePath,
  minimumWidth,
  minimumHeight,
  maximumWidth,
  maximumHeight,
  allowedImageTypes
} from './constants'
import { IFilesData, IFileDatum, IFS, IImageSpecs } from './interfaces'

export const getPathFactory = (getUID: () => string) => (
  fileName: string
): string => {
  const fullName = `${getUID()}_${fileName}`

  return join(storagePath, fullName)
}

export const getPath = getPathFactory(uuidv4)

export const getFileData = (filesData: IFilesData): IFileDatum => {
  return Object.keys(filesData).map((key) => {
    return filesData[key]
  })[0]
}

export const maybeMakeDirFactory = (diskUtils: IFS) => () => {
  if (!diskUtils.existsSync(storagePath)) {
    diskUtils.mkdirSync(join(storagePath))
  }
}

export const maybeMakeDir = maybeMakeDirFactory(fs)

export const isCorrectSize = (specs: IImageSpecs): boolean => {
  return (
    specs.width >= minimumWidth &&
    specs.width <= maximumWidth &&
    specs.height >= minimumHeight &&
    specs.height <= maximumHeight
  )
}

export const isCorrectType = (specs: IImageSpecs) =>
  allowedImageTypes.includes(specs.type.toLocaleLowerCase())
