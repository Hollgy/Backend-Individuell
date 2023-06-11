import React, { useState, useEffect } from 'react';

function Messages({ channelName, channelId }) {
    const [newMessage, setNewMessage] = useState('');
    const [channelMessages, setChannelMessages] = useState([]);

    useEffect(() => {
        const fetchChannelMessages = async () => {
            try {
                const response = await fetch(`/api/channels/${channelId}`);
                if (response.ok) {
                    const data = await response.json();
                    setChannelMessages(data.channelMessages);
                } else {
                    throw new Error('Failed to fetch channel messages');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchChannelMessages();
    }, [channelId]);

    const handleMessageSubmit = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        const messageData = {
            author: 'user-1',
            content: newMessage,
        };

        try {
            const response = await fetch(
                `/api/channels/${channelId}/channelMessages`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const newMessageId = data.id;

                const updatedChannelMessages = [
                    ...channelMessages,
                    {
                        id: newMessageId,
                        author: messageData.author,
                        content: messageData.content,
                        timestamp: new Date().toISOString(),
                    },
                ];

                setNewMessage('');
                setChannelMessages(updatedChannelMessages);
            } else {
                console.log('Något gick fel');
            }
        } catch (error) {
            console.log('Något gick fel', error);
        }
    };

    return (
        <div className="chat-area">
            <section className="heading">
                Chattar i <span className="chat-name">{channelId}</span>
            </section>
            <section className="history">
                {channelMessages.length > 0 ? (
                    channelMessages.map((message) => (
                        <section key={message.id} className={message.author}>
                            <p>
                                {message.author}: {message.content}
                            </p>
                            <p>{message.timestamp}</p>
                        </section>
                    ))
                ) : (
                    <p>Inga meddelanden</p>
                )}
            </section>
            <section>
                <input
                    type="text"
                    placeholder="Ditt meddelande..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleMessageSubmit}>Skicka</button>
            </section>
        </div>
    );
}

export default Messages;
