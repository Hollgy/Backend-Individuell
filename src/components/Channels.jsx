import { useState, useEffect } from 'react'
import { addChannel, deleteChannel, getChannels } from '../channelEndpoints'
import Messages from './Messages'
import { loginState } from './Data/atoms'
import { useRecoilValue } from 'recoil'



function Channels() {
    const [errorMessage, setErrorMessage] = useState('')
    const [channel, setChannel] = useState([])
    const [selectedChannel, setSelectedChannel] = useState(null);
    // const [messages, setMessages] = useState([]); // Ny state-variabel för meddelanden
    const [channelMessages, setChannelMessages] = useState([]);
    const isLoggedIn = useRecoilValue(loginState)

    const channelName = channel.find(c => c.id == selectedChannel)?.name

    useEffect(() => {
        handleGetChannels()
    }, [])

    // console.log('Channels:', channel, selectedChannel, channelName,);


    const handleGetChannels = async () => {
        try {
            const data = await getChannels();
            setChannel(data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            console.log('Error in fetching channels');
        }
    };

    // kod för handle av DeleteChannel samt Submit kvarstår då funktionen finns, bara att den inte brukas i webappen.

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
            const newChannel = { name: channelName, id: Math.random().toString() };
            await addChannel(channelName, setErrorMessage, getChannels, newChannel);
            setChannel((prevChannels) => [...prevChannels, newChannel]);
            console.log('channel added');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChannelClick = async (channelId, channelName) => {
        setSelectedChannel(channelId);
        try {
            const response = await fetch(`/api/channels/${channelId}`);
            if (response.ok) {
                const data = await response.json();
                setChannelMessages(data);
                // console.log(data);
            } else {
                throw new Error('Failed to fetch channel messages');
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(isLoggedIn);
    console.log(channel);
    return (
        <div>
            <hr />
            <div className='nav'>
                <section className='add-channel-section'>
                    {/* <form action='submit' className='add-channel-form'>
                        <input
                            type='text'
                            placeholder='Namn på ny kanal'
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <button type='submit' onClick={handleSubmitChannel}>
                            Lägg till Kanal
                        </button>
                    </form> */}
                </section>
                <section className='show-channel-section'>
                    <div>
                        <h3>[Kanaler]:</h3>
                    </div>
                    {channel
                        .filter((channel) => channel.public == true || isLoggedIn)
                        .map((channel) => (
                            <h3
                                className="channel"
                                key={channel.id}
                                onClick={() => handleChannelClick(channel.id)}
                            >
                                <p onClick={() => setSelectedChannel(channel.id)}>#{channel.name}</p>
                            </h3>
                        ))}
                    {/* Render locked channels */}
                    {channel
                        .filter((channel) => channel.public == false && !isLoggedIn)
                        .map((channel) => (
                            <h3 className="channel" key={channel.id}>
                                {channel.name} 🔒
                            </h3>
                        ))}
                    {/* <button onClick={() =>  handleDeleteChannel(channel.id)}>Delete Channel</button> */}
                </section>
                <br />
            </div>
            {selectedChannel && (
                <Messages
                    channelId={selectedChannel}
                    channelName={channelName}
                />
            )}

        </div>
    );
}


export default Channels

