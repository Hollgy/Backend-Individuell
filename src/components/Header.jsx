import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, usernameAtom } from "./Data/atoms";
import { loginUser } from "./loginEndpoints";

function Header() {
    const [loggedInState, setLoggedInState] = useRecoilState(loginState);
    const [username, setUsername] = useRecoilState(usernameAtom);
    const [usernameTextField, setusernameTextField] = useState('')
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const success = await loginUser(usernameTextField, password);
            if (success) {
                setLoggedInState(true);
                setusernameTextField("");
                setUsername(usernameTextField)
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleLogout = () => {
        setLoggedInState(false);
        setUsername("")
        setusernameTextField("");
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
                            value={usernameTextField}
                            onChange={(e) => setusernameTextField(e.target.value)}
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
