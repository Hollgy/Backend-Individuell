import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

// endpoints för kanaler
// PUT[] edita kanaler

// GET[x] hämta och visa kanaler
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.channels)
})


// POST[x] addera kanaler
router.post('/', async (req, res) => {
    let addChannel = req.body
    
    await db.read()
    addChannel.id = Math.floor(Math.random() * 100000)
    db.data.channels.push(addChannel)
    await db.write()
    res.send({ id: addChannel.id })
})


// DELETE[x] ta bort kanaler
router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)
    
    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return
    }
    
    await db.read()
    let findChannel = db.data.channels.find(channel => channel.id === id)
    if (!findChannel) {
        res.sendStatus(404)
        return
    }
    
    db.data.channels = db.data.channels.filter(channel => channel.id !== id)
    await db.write()
    res.sendStatus(200)
});


export default router