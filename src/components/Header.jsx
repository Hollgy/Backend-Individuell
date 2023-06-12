import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./Data/atoms";
import { loginUser } from "./loginEndpoints";

function Header() {
    const [loggedInState, setLoggedInState] = useRecoilState(loginState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const success = await loginUser(username, password);
            if (success) {
                setLoggedInState(true);
                setUsername(username);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleLogout = () => {
        setLoggedInState(false);
        setUsername("");
        setPassword("");
        setErrorMessage("");
    };

    return (
        <>
            <header>
                <h1>Chappy</h1>
                {loggedInState ? (
                    <div className="user-status">
                        <span>Inloggad som {username}</span>
                        <button onClick={handleLogout}>Logga ut</button>
                    </div>
                ) : (
                    <div className="user-status">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Logga in</button>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
