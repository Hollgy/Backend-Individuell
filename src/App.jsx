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



    // ENDPOINT POST PRODUCT
    // const addChannel = async (channelName) => {
    //     setErrorMessage('');
    //     try {
    //         const response = await fetch(`/api/channels`, {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 name: channelName,
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (response.status === 200) {
    //             // Channel successfully added
    //             // Perform any necessary actions after adding the channel
    //             getChannels();
    //         } else if (response.status === 400) {
    //             // Invalid request
    //             const errorText = await response.text();
    //             setErrorMessage(errorText);
    //         } else if (response.status === 404) {
    //             // Channel not found
    //             const errorText = await response.text();
    //             setErrorMessage(errorText);
    //         } else {
    //             // Other error occurred
    //             throw new Error('An error occurred while adding the channel');
    //         }
    //     } catch (error) {
    //         // Handle network or fetch error
    //         setErrorMessage(error.message);
    //         console.log('Error in adding channel');
    //     }
    // };



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
