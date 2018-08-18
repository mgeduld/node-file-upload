import * as fs from 'fs'
import { IRequest, IResponse, IFileDatum, IFS } from './interfaces'
import { getFileData, maybeMakeDir } from './utils'
import { storeImage } from './storage'
import { storagePath } from './constants'

export const uploadAPIFactory = (
  maybeMakeDirFn: Function,
  storeImageFn: (fileData: IFileDatum) => Promise<any>
) => async (req: IRequest, res: IResponse) => {
  const fileData = getFileData(req.files)
  maybeMakeDirFn()
  await storeImageFn(fileData)
  res.json({ message: 'Image saved' })
}

export const uploadAPI: any = uploadAPIFactory(maybeMakeDir, storeImage)

export const pathsAPIFactory = (diskUtils: IFS) => (
  req: IRequest,
  res: IResponse
) => {
  let images = []
  if (diskUtils.existsSync(storagePath)) {
    const files = diskUtils.readdirSync(storagePath)
    images = files || []
  }
  res.json({ images })
}

export const pathsAPI = pathsAPIFactory(fs)
