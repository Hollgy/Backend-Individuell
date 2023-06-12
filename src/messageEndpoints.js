const getMessages = async () => {
    try {
        const response = await fetch('api/channelMessages');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error when fetching messages');
    }
};

const deleteMessage = async (channelId, messageId, setErrorMessage, setMessages) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channelMessages/${channelId}/${messageId}`, { method: 'DELETE' });
        if (response.status === 200) {
            setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
        } else if (response.status === 404) {
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            throw new Error('Error while deleting message');
        }
    } catch (error) {
        setErrorMessage(error.message);
        console.log('Error');
    }
};

const addMessage = async (channelId, author, content, setErrorMessage, setMessages) => {
    setErrorMessage('');
    try {
        const response = await fetch('/api/channelMessages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channelId, author, content }),
        });
        if (response.status === 200) {
            const newMessage = await response.json();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else if (response.status === 404) {
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            throw new Error('Error while adding message');
        }
    } catch (error) {
        setErrorMessage(error.message);
        console.log('Error');
    }
};

const updateMessage = async (channelId, messageId, content, setErrorMessage, setMessages) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channelMessages/${channelId}/${messageId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        if (response.status === 200) {
            const updatedMessage = await response.json();
            setMessages((prevMessages) =>
                prevMessages.map((message) => (message.id === messageId ? updatedMessage : message))
            );
        } else if (response.status === 404) {
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            throw new Error('Error while updating message');
        }
    } catch (error) {
        setErrorMessage(error.message);
        console.log('Error');
    }
};

const getMessageById = async (channelId, messageId, setErrorMessage) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channelMessages/${channelId}/${messageId}`);
        if (response.status === 200) {
            const message = await response.json();
            return message;
        } else if (response.status === 404) {
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            throw new Error('Error while fetching message');
        }
    } catch (error) {
        setErrorMessage(error.message);
        console.log('Error');
    }
};

export { getMessages, deleteMessage, addMessage, updateMessage, getMessageById };
