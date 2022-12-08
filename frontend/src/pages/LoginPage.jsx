import { useState, useEffect, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/slices/authSlice";
const Login = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                await dispatch(login({ username, password })).unwrap();
            } catch (error) {
                setError(error);
            }
            console.log({
                username: username,
                password: password,
                error: error,
            });
        },
        [username, password, dispatch]
    );

    const enterSubmit = useCallback(
        ({ charCode }) => {
            if (loading.auth || error) return;
            if (charCode === 13) handleLogin();
        },
        [error, loading, handleLogin]
    );

    const resetValues = () => {
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        document.addEventListener("keypress", enterSubmit);
        return () => {
            document.removeEventListener("keypress", enterSubmit);
        };
    }, [enterSubmit]);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

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
            <hr />
            <button onClick={handleLogin} disabled={loading.auth}>
                Login
            </button>
            <button onClick={resetValues}>Reset Values</button>
            <Link to="/signup">Don't have an account? Sign up here!</Link>
        </div>
    );
};
export default Login;
