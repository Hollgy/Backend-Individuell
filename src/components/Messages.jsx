import React, { useState, useEffect } from 'react';
import { getMessages, addMessage, deleteMessage, updateMessage, getMessageById } from '../messageEndpoints';
import { useRecoilState } from 'recoil';
import { usernameAtom } from './Data/atoms';
import { messages } from './Data/atoms';

function Messages({ channelName, channelId }) {
    const [messages, setMessages] = useRecoilState(messages);
    const [errorMessage, setErrorMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useRecoilState(usernameAtom);


    useEffect(() => {
        fetchMessages();
    }, [channelId]);

    const fetchMessages = async () => {
        try {
            const fetchedMessages = await getMessages(channelId);
            setMessages(fetchedMessages);
        } catch (error) {
            setErrorMessage(`Error when fetching messages: ${error.message}`);
        }
    };

    const handleAdd = async (channelId, content, author) => {
        try {
            await addMessage(channelId, content, author, setErrorMessage);
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            setErrorMessage(`Error when adding message: ${error.message}`);
        }
    };

    const handleDelete = async (channelId, messageId) => {
        try {
            await deleteMessage(channelId, messageId, setErrorMessage);
            fetchMessages();
        } catch (error) {
            setErrorMessage(`Error when deleting message: ${error.message}`);
        }
    };

    const handleUpdate = async (channelId, messageId, updatedContent) => {
        try {
            await updateMessage(channelId, messageId, updatedContent, setErrorMessage);
            fetchMessages();
        } catch (error) {
            setErrorMessage(`Error when updating message: ${error.message}`);
        }
    };

    return (
        <div className="chat-area">
            <section className="heading">
                Chattar i <span className="chat-name">{channelId}</span>
            </section>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.author || username}: {message.content}
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
                <button onClick={() => handleAdd(channelId, newMessage, username)}>Skicka</button>
            </section>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Messages;
