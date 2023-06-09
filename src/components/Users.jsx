import { useState, useEffect } from 'react'
import { getUsers, deleteUser, addUser } from '../userEndpoints'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineUserRemove } from 'react-icons/hi'

function Users() {
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState([])
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')


    useEffect(() => {
        // eventuellt addera en if stats för att kolla om data har fetchats eller ej
        handleGetUsers()
    }, [])



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
            await addUser(userName, userPassword, setErrorMessage, newUser);
            setUser((prevUsers) => [...prevUsers, newUser]);
            console.log('user added');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='nav'>
                <br />
                <section className='add-user-section'>
                    <form action="submit" className='add-user-form'>
                    <h4>Registrera användare</h4>
                        <input type="text" placeholder='Namn på ny användare' value={userName} onChange={e => setUserName(e.target.value)} />
                        <input type="text" placeholder='Ange lösenord' value={userPassword} onChange={e => setUserPassword(e.target.value)} /><button type='submit' onClick={handleSubmitUser}>Lägg till användare</button>
                    </form>
                </section>
                <br />
                <section className='show-user-section'>
                    <div><h3>[DM]:</h3></div>
                    {/* <button onClick={handleGetUsers}>Show me all the users</button> */}
                    {user.map(user => (
                        <div className='user' key={user.id}>
                            <h4> <AiOutlineUser /> {user.name}</h4>
                            <button title='remove user' onClick={() => handleDeleteUser(user.id)}><HiOutlineUserRemove /></button>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}

export default Users