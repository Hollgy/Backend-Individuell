import React, { useState, useEffect } from 'react';
// import { getMessages, addMessage, deleteMessage, updateMessage, getMessageById } from '../messageEndpoints';
import { useRecoilState } from 'recoil';
import { usernameAtom } from './Data/atoms';
import { messagesAtom } from './Data/atoms';

function Messages({ channelName, channelId }) {
    const [messages, setMessages] = useRecoilState(messagesAtom);
    const [errorMessage, setErrorMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useRecoilState(usernameAtom);



    const getMessages = async (channelId) => {
        try {
            const response = await fetch(`/api/channelMessages/${channelId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error when fetching messages:', error);
            throw new Error('Error when fetching messages');
        }
    };

    const getMessageById = async (channelId, messageId, setErrorMessage) => {
        setErrorMessage('');
        try {
            const message = await getMessageById(channelId, messageId, setErrorMessage);
            return message;
        } catch (error) {
            setErrorMessage(error.message);
            console.log('Error');
        }
    };
    const deleteMessage = async (channelId, messageId, setErrorMessage) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/channelMessages/${channelId}/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                console.error('Error:', errorData.error);
            }
        } catch (error) {
            setErrorMessage(`Error when deleting message: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };


    const addMessage = async (channelId, content, username, setErrorMessage, messagesAtom) => {

        try {
            const response = await fetch(`/api/channelMessages/${channelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId,
                    author: username,
                    content,
                }),
            });

            if (response.ok) {
                setMessages(messages); // Assuming fetchMessages is a function to retrieve updated messages
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                console.error('Error:', errorData.error);
            }
        } catch (error) {
            setErrorMessage(`Error when adding message: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };

    const updateMessage = async (channelId, messageId, content, setErrorMessage, setMessages) => {
        setErrorMessage('');
        try {
            await updateMessage(channelId, messageId, content, setErrorMessage, setMessages);
        } catch (error) {
            setErrorMessage(error.message);
            console.log('Error');
        }
    };


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
