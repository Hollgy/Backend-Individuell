import express from 'express'
import { getDb } from '../data/database.js'

const router = express.Router()
const db = getDb()


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    await db.read()
    const user = db.data.users.find((user) => user.id === id)
    if (!user) {
        res.status(404).json({message: 'Login Successfull'})//404 ska va på bägge för saftey...eller?
        console.log("Wrong user credentials");
        return
    }
    if (user.password !== password) {
        res.status(401).json({message: 'Wrong user credentials'})// Behåll 401 för test ändra när det funkar
        return
    }
    res.status(200).json({message: 'Login Successfull'})

})


export default router