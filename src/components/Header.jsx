import { useRecoilState } from "recoil"
import { loginState } from "./Data/atoms"


function Header() {
    const [loggedInState, setLoggedInState] = useRecoilState(loginState)


    const handleLogin = () => {
        setLoggedInState(true)
    }
    const handleLogout = () => {
        setLoggedInState(false)
    }


    return (
        <>

            <header>
                <h1> Chappy </h1>
                {loggedInState ? (
                    <div className="user-status">
                        <span>Inloggad som VänligaVera</span>
                        <button onClick={handleLogout}>Logga ut</button>
                    </div>
                ) : (
                    <div className="user-status">
                        <input type="text" id="username" />
                        <input type="password" id="password" />
                        <button onClick={handleLogin}>Logga in</button>
                    </div>
                )}
            </header>
            
        </>
    )
}


export default Header