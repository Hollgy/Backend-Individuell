import { useState, useEffect } from 'react'
import './styling/App.css'
// import './styling/channels.css'
// import './styling/users.css'
// import './styling/sidebar.css'
// import './styling/header.css'
import Header from './components/Header'
import Sidebar from './components/sidebar'
import Messageboard from './components/Messagboard'



function App() {

    return (
        <>
            <Header />
            <hr />
            <Sidebar />
            < Messageboard />
            <hr />
        </>
    )
}

export default App
