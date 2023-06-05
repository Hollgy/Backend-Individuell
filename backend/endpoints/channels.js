import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.channels)
})


// endpoints för kanaler
// GET[] hämta och visa kanaler
// PUT[] edita kanaler
// POST[] addera kanaler
// DELETE[] ta bort kanaler

export default router