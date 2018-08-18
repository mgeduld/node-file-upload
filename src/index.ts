import express = require('express')
import logger = require('morgan')
import fileUpload = require('express-fileupload')
import { uploadAPI, pathsAPI } from './api'
import { port } from './constants'
import { hasImage, isValidImage } from './middleware'

const init = () => {
  const app = express()
  app.use(logger('dev'))
  app.use(fileUpload())

  app.post('/api/v1/upload', hasImage, isValidImage, uploadAPI)
  app.get('/api/v1/', pathsAPI)

  app.use((req, res, next) => {
    const err: any = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res.status(err.status || res.statusCode || 500)
    res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    })
  })

  app.listen(port, () => console.log(`Listening on ${port}...`))
}

init()
