import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

// endpoints för kanaler
// PUT[] edita kanaler
// DELETE[] ta bort kanaler

// GET[x] hämta och visa kanaler
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.channels)
})


// POST[] addera kanaler
router.post('/', async (req, res) => {
    let addChannel = req.body

    await db.read()
    addChannel.channelId = Math.floor(Math.random() * 100000)
    db.data.channels.push(addChannel)
    await db.write()
    res.send({ channelId: addChannel.id })
})

export default router