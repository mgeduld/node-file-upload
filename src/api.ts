import { IRequest, IResponse, IFileDatum } from './interfaces'
import { getFileData, maybeMakeDir } from './utils'
import { storeImage } from './storage'

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
