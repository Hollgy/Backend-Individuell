import { useState, useEffect } from 'react'
import './styling/App.css'
import './styling/channels.css'
import { getChannels, deleteChannel, addChannel } from './channelEndpoints'



function App() {
    const [channel, setChannel] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [channelName, setChannelName] = useState('')

    const handleClickGetChannels = async () => {
        try {
            const data = await getChannels();
            setChannel(data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            console.log('Error in fetching channels');
        }
    };

    const handleDeleteChannel = async (channelId) => {
        try {
            await deleteChannel(channelId, setErrorMessage, setChannel);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitChannel = async (event) => {
        event.preventDefault();
        try {
            setChannelName('');
            const newChannel = { name: channelName, id: Math.random().toString() };
            await addChannel(channelName, setErrorMessage, getChannels, newChannel);
            setChannel((prevChannels) => [...prevChannels, newChannel]);
            console.log('channel added');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div><h1>
                Chappy
            </h1></div>
            <hr />
            <div>
                <section className='show-channel-section'>
                    <div><h3>Kanaler:</h3></div>
                    <button onClick={handleClickGetChannels}>Show me all the channels</button>
                    {channel.map(channel => (
                        <div className='channel' key={channel.id}>
                            <p> #{channel.name}</p>
                            {/* <p>Id: {channel.id}</p> */}
                            <button onClick={() => handleDeleteChannel(channel.id)}>Delete Channel</button>
                        </div>
                    ))}

                </section>
                <section className='add-channel-section'>
                    <form action="submit" className='add-channel-form'>
                        <input type="text" placeholder='Namn på ny kanal' value={channelName} onChange={e => setChannelName(e.target.value)} /><button type='submit' onClick={handleSubmitChannel}>Lägg till Kanal</button>
                    </form>
                </section>

            </div>

        </>
    )
}

export default App
