import { useRecoilState } from "recoil";
import { messages } from "./components/Data/atoms";


const getMessages = async (channelId) => {
    try {
        // Replace with your implementation to fetch messages
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

const deleteMessage = async (channelId, messageId, setErrorMessage, setMessages) => {
    setErrorMessage('');
    try {
        await deleteMessage(channelId, messageId, setErrorMessage, setMessages);
    } catch (error) {
        setErrorMessage(error.message);
        console.log('Error');
    }
};


const addMessage = async (channelId, content, username, setErrorMessage) => {
    const [messages, setMessages] = useRecoilState(messages);

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

export { getMessages, deleteMessage, addMessage, updateMessage, getMessageById };
