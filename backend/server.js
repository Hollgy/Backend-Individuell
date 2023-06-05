// Import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
// import usersRouter from './endpoints/users.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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





// start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})