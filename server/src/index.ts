import express from 'express'
import { connect } from 'mongoose'

import { routes } from './routes'

const { 
  APP_PORT,
  MONGO_ADMIN_USER,
  MONGO_ADMIN_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_NAME
} = process.env

const app = express()

app.use(express.json())
app.use(routes)

console.log('INFO: MongoDB connecting...')

connect(`mongodb://${MONGO_ADMIN_USER}:${MONGO_ADMIN_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`)

  .then(() => {
    console.log('LOG: MongoDB connected')
    console.log('INFO: Starting server...')
    app.listen(APP_PORT, () => {
      console.log(`LOG: Running in http://localhost:${APP_PORT}`)
    })
  })

  .catch((err) => {
    console.log('ERROR: MongoDB not connected')
    console.log(err)
  })
