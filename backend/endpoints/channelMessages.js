import express from 'express';
import { getDb } from '../data/database.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const db = getDb();

// GET all channel messages
router.get('/', async (req, res) => {
    await db.read();
    const channelMessages = db.data.channels.flatMap((channel) => channel.channelMessages);
    res.json(channelMessages);
});

// POST create a new channel message
router.post('/channelId', async (req, res) => {
    const { channelId, author, content } = req.body;

    await db.read();
    const channel = db.data.channels.find((c) => c.id === channelId);
    if (!channel) {
        res.status(404).json({ error: 'Channel not found' });
        return;
    }

    const newMessage = {
        id: uuidv4(),
        author,
        content,
    };

    channel.channelMessages.push(newMessage);
    await db.write();
    res.json(newMessage);
});

// GET channel messages of a specific channel
router.get('/:channelId', async (req, res) => {
    const { channelId } = req.params;

    await db.read();
    const channel = db.data.channels.find((c) => c.id === parseInt(channelId));
    if (!channel) {
        res.status(404).json({ error: 'Channel not found' });
        return;
    }

    res.json(channel.channelMessages);
});

// PUT update a channel message
router.put('/:channelId/:messageId', async (req, res) => {
    const { channelId, messageId } = req.params;
    const { content } = req.body;

    await db.read();
    const channel = db.data.channels.find((c) => c.id === parseInt(channelId));
    if (!channel) {
        res.status(404).json({ error: 'Channel not found' });
        return;
    }

    const message = channel.channelMessages.find((m) => m.id === messageId);
    if (!message) {
        res.status(404).json({ error: 'Message not found' });
        return;
    }

    message.content = content;
    await db.write();
    res.json(message);
});

// DELETE a channel message
router.delete('/:channelId/:messageId', async (req, res) => {
    const { channelId, messageId } = req.params;

    await db.read();
    const channel = db.data.channels.find((c) => c.id === parseInt(channelId));
    if (!channel) {
        res.status(404).json({ error: 'Channel not found' });
        return;
    }

    const messageIndex = channel.channelMessages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) {
        res.status(404).json({ error: 'Message not found' });
        return;
    }

    const deletedMessage = channel.channelMessages.splice(messageIndex, 1);
    await db.write();
    res.json(deletedMessage);
});

export default router;
