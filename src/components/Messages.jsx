import React, { useState, useEffect } from 'react';
import { getMessages, addMessage, deleteMessage, updateMessage, getMessageById } from '../messageEndpoints';

function Messages({ channelName, channelId }) {
    const [messages, setMessages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(channelId);
                setMessages(response);
            } catch (error) {
                console.log('Error when fetching messages:', error);
                setErrorMessage('Error when fetching messages');
            }
        };

        fetchMessages();
    }, [channelId]); // Add 'channelId' to the dependency array

    const handleAdd = async (channelId, content) => {
        try {
            await addMessage(channelId, content, username, setErrorMessage);
            setNewMessage('');
        } catch (error) {
            console.log('Error when adding message:', error);
        }
    };

    const handleDelete = async (channelId, messageId) => {
        try {
            await deleteMessage(channelId, messageId, setErrorMessage, setMessages);
        } catch (error) {
            console.log('Error when deleting message:', error);
        }
    };

    const handleUpdate = async (channelId, messageId, content) => {
        try {
            await updateMessage(channelId, messageId, content, setErrorMessage, setMessages);
        } catch (error) {
            console.log('Error when updating message:', error);
        }
    };

    return (
        <div className="chat-area">
            <section className="heading">
                Chattar i <span className="chat-name">{channelName}</span>
            </section>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.author}: {message.content}
                        <button onClick={() => handleDelete(channelId, message.id)}>Delete</button>
                        <button onClick={() => handleUpdate(channelId, message.id, 'Updated Content')}>
                            Update
                        </button>
                    </div>
                ))}
            </div>
            <section>
                <input
                    type="text"
                    placeholder="Ditt meddelande..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={() => handleAdd(channelId, newMessage)}>Skicka</button>
            </section>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Messages;
