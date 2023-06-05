import express from 'express'
import { getDb } from '../data/database'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})


// endpoints för kanaler
// GET[] hämta och visa kanaler
// PUT[] edita kanaler
// POST[] addera kanaler
// DELETE[] ta bort kanaler

export default router