import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()


// endpoints för användare
// PUT[] ändra användare
// DELETE[] ta bort användare

// GET[x] hämta alla användare
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})

// POST[x] addera användare
router.post('/', async (req, res) => {
    let addUser = req.body

    await db.read()
    addUser.id = Math.floor(Math.random() * 100000)
    db.data.users.push(addUser)
    await db.write()
    res.send({ id: addUser.id })
})

router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)

    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return
    }

    await db.read()
    let findUser = db.data.users.find(user => user.id === id)
    if (!findUser) {
        res.sendStatus(404)
        return
    }

    db.data.users = db.data.users.filter(user => user.id !== id)
    await db.write()
    res.sendStatus(200)
});

export default router