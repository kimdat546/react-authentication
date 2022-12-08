import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ username: username, password: password, error: error });
    };

    const resetValues = () => {
        setUsername("");
        setPassword("");
        setRePassword("");
    };

    return (
        <div className="content-container">
            <h1>Login</h1>
            {error && <div className="fail">{error}</div>}
            <label>
                Username:
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </label>
            <label>
                Password:
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                Re-password:
                <input
                    onChange={(e) => setRePassword(e.target.value)}
                    value={rePassword}
                />
            </label>
            <hr />
            <button onClick={handleSubmit}>Sign Up</button>
            <button onClick={resetValues}>Reset Values</button>
            <Link to="/login">Already have an account? Login here!</Link>
        </div>
    );
};
export default SignUp;
