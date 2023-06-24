const sessionStorageKey = 'jwtTest';

const loginUser = async (username, password) => {
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            // Login success
            const data = await response.json();
            console.log(data);
            const token = data.token;
            sessionStorage.setItem(sessionStorageKey, token);
            return true;
        } else if (response.status === 404) {
            throw new Error("Invalid username or password");
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error("Error occurred during login: " + error.message);
    }
};

const handleGetData = async () => {
    try {
        const isJwt = sessionStorage.getItem(sessionStorageKey);

        const options = {
            headers: {},
        };
        if (isJwt) {
            options.headers.Authorization = "Bearer " + isJwt;
        }

        const response = await fetch('/api/login', options);
        const data = await response.json();
        setMessage(data.message);
        console.log(message);
    } catch (error) {
        throw new Error("Error occurred while fetching data: " + error.message);
    }
};

export { loginUser, handleGetData };
