import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})


// endpoints för användare
// GET[] hämta alla användare
// POST[] addera användare
// PUT[] ändra användare
// DELETE[] ta bort användare

export default router