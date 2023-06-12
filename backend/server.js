// Import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './endpoints/users.js'
import channelsRouter from './endpoints/channels.js'
import messagesRouter from './endpoints/messages.js'
import loginRouter from './endpoints/messages.js'
import channelMessagesRouter from './endpoints/channelMessages.js'

//server config
const port = process.env.PORT || 9922
const app = express()


//middleware
app.use(cors())
app.use('/api', express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))

//api

app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/login', loginRouter)
app.use('/api/channelMessages', channelMessagesRouter)




// start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})