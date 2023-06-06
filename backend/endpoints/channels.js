import express from 'express'
import { getDb } from '../data/database.js'
import { isValidChannel } from '../data/constants.js'

const router = express.Router()
const db = getDb()

// endpoints för kanaler

// GET[x] hämta och visa kanaler
// GET[x] :id
// POST[x] addera kanaler
// DELETE[x] ta bort kanaler
// PUT [x] Ändra namn på kanal

// GET[x] hämta och visa kanaler
router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.channels)
})

// GET[x] :id
router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const channel = db.data.channels.find((p) => p.id === id);
        if (channel) {
            res.send(channel);
        } else {
            res.status(404).send('Channel not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});

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

// PUT [x] Ändra namn på kanal
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // Validera body (object)
    if (!isValidChannel(req.body)) {
        res.sendStatus(400);
        return;
    }

    // Finns kanal med samma id?
    await db.read();
    const oldChannelIndex = db.data.channels.findIndex(channel => channel.id === id);
    if (oldChannelIndex === -1) {
        res.sendStatus(404);
        return;
    }

    // I så fall uppdatera objektet
    const updatedChannel = req.body;
    updatedChannel.id = id;

    db.data.channels[oldChannelIndex] = updatedChannel;
    await db.write();
    res.sendStatus(200);
});

export default router