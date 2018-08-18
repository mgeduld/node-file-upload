import { promisify } from 'util'
import { IFileDatum } from './interfaces'
import { getPath } from './utils'

export const storeImage = (fileData: IFileDatum) => {
  const move = promisify(fileData.mv)

  return move(getPath(fileData.name))
}
