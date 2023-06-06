import express from 'express'
import { getDb } from '../data/database.js'
import { isValidUser } from '../data/constants.js'

const router = express.Router()
const db = getDb()


// endpoints för användare

// GET[x] hämta och visa användare
// GET[x] :id
// POST[x] addera användare
// DELETE[x] ta bort användare
// PUT [x] Ändra namn på användare

// GET[x] hämta alla användare
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})


// GET[x] :id
router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const user = db.data.users.find((p) => p.id === id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});




// POST[x] addera användare
router.post('/', async (req, res) => {
    let addUser = req.body

    await db.read()
    addUser.id = Math.floor(Math.random() * 100000)
    db.data.users.push(addUser)
    await db.write()
    res.send({ id: addUser.id })
})

// DELETE[x] ta bort användare
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

// PUT[x] ändra användare
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Validera body (object)
    if (!isValidUser(req.body)) {
        res.sendStatus(400);
        console.log('test1');
        return;
    }

    // Finns användare med samma id?
    await db.read();
    const oldUserIndex = db.data.users.findIndex(user => user.id === id);
    if (oldUserIndex === -1) {
        res.sendStatus(404);
        console.log('test2');
        return;
    }

    // I så fall uppdatera objektet
    const updatedUser = req.body;
    updatedUser.id = id;

    db.data.users[oldUserIndex] = updatedUser;
    await db.write();
    res.sendStatus(200);
});


export default router