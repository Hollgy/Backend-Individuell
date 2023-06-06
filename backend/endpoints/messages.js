import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()


// GET[x] hämta alla meddelanden
// POST[x] addera meddelande
// DELETE[x] ta bort meddelande


// GET[x] hämta alla meddelanden
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.messages)
})


// POST[x] addera meddelande
router.post('/', async (req, res) => {
    let addMessage = req.body

    await db.read()
    addMessage.id = Math.floor(Math.random() * 100000)
    db.data.messages.push(addMessage)
    await db.write()
    res.send({ id: addMessage.id })
})

// DELETE[x] ta bort meddelande
router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)

    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return
    }

    await db.read()
    let findMessage = db.data.messages.find(message => message.id === id)
    if (!findMessage) {
        res.sendStatus(404)
        return
    }

    db.data.messages = db.data.messages.filter(message => message.id !== id)
    await db.write()
    res.sendStatus(200)
});

export default router