const loginUser = async (username, password) => {
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            // Login success
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

export { loginUser };
