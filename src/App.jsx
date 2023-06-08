import { useState, useEffect } from 'react'
import './styling/App.css'
import './styling/channels.css'
import { getChannels, deleteChannel, addChannel } from './channelEndpoints'
import { getUsers, deleteUser, addUser } from './userEndpoints'



function App() {
    const [errorMessage, setErrorMessage] = useState('')
    const [channel, setChannel] = useState([])
    const [channelName, setChannelName] = useState('')
    const [user, setUser] = useState([])
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

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


    const handleGetUsers = async () => {
        try {
            const data = await getUsers()
            setUser(data)
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.message)
            console.log('Fel vid hämtning av users');
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId, setErrorMessage, setUser);
        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmitUser = async (event) => {
        event.preventDefault();
        try {
            setUserName('');
            setUserPassword('')
            const newUser = { name: userName, password: userPassword, id: Math.random().toString() };
            await addUser(userName, userPassword, setErrorMessage, getChannels, newUser);
            setUser((prevUsers) => [...prevUsers, newUser]);
            console.log('user added');
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
                <section className='add-channel-section'>
                    <form action="submit" className='add-channel-form'>
                        <input type="text" placeholder='Namn på ny kanal' value={channelName} onChange={e => setChannelName(e.target.value)} /><button type='submit' onClick={handleSubmitChannel}>Lägg till Kanal</button>
                    </form>
                </section>
                <section className='show-channel-section'>
                    <div><h3>Kanaler:</h3></div>
                    <button onClick={handleClickGetChannels}>Show me all the channels</button>
                    {channel.map(channel => (
                        <div className='channel' key={channel.id}>
                            <p> #{channel.name}</p>
                            <button onClick={() => handleDeleteChannel(channel.id)}>Delete Channel</button>
                        </div>
                    ))}
                </section>
                <br />
                <section className='add-user-section'>
                    <form action="submit" className='add-user-form'>
                        <input type="text" placeholder='Namn på ny användare' value={userName} onChange={e => setUserName(e.target.value)} />
                        <input type="text" placeholder='Ange lösenord' value={userPassword} onChange={e => setUserPassword(e.target.value)} /><button type='submit' onClick={handleSubmitUser}>Lägg till användare</button>
                    </form>
                </section>
                <br />
                <section className='show-user-section'>
                    <div><h3>användare:</h3></div>
                    <button onClick={handleGetUsers}>Show me all the users</button>
                    {user.map(user => (
                        <div className='user' key={user.id}>
                            <p> #{user.name}</p>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete Channel</button>
                        </div>
                    ))}
                </section>


            </div>

        </>
    )
}

export default App
