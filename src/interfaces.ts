export interface IRestApi {
  get?: Function
  post?: Function
  put?: Function
  delete?: Function
}

export interface IResponse {
  json?: (value: object | any[]) => Promise<any>
  cookie?(key: string, value: any, config: object)
  clearCookie?(key: string)
}

export interface IFileDatum {
  name: string
  data: Buffer
  encoding: string
  truncated: boolean
  mimetype: string
  md5: string
  mv: Function
}

export interface IFilesData {
  [key: string]: IFileDatum
}

export interface IRequest {
  params?: { [key: string]: any }
  query?: { [key: string]: any }
  body?: { [key: string]: any }
  app?: {
    get: (key: string) => any
  }
  files: IFilesData
}

export interface IFS {
  existsSync: (path: string) => boolean
  mkdirSync: (path: string) => void
}

export interface IImageSpecs {
  height: number
  width: number
  type: string
}
