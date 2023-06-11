import { useState, useEffect } from 'react'
import './styling/App.css'
// import './styling/channels.css'
// import './styling/users.css'
// import './styling/sidebar.css'
// import './styling/header.css'
import Header from './components/Header'
import Users from './components/Users'
import Channels from './components/Channels'



function App() {

    return (
        <>
            <Header />
            <Channels />
            <Users />
            <hr />
            <hr />
        </>
    )
}

export default App
