import * as os from 'os'
import { join } from 'path'

export const storagePath =
  process.env.STORAGE_PATH || join(os.homedir(), 'images')

export const port = process.env.PORT || 1234

export const minimumWidth = 350
export const maximumWidth = 5000
export const minimumHeight = 350
export const maximumHeight = 5000
export const allowedImageTypes = ['jpg', 'jpeg', 'png']
