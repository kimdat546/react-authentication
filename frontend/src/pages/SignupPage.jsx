import { useState, useEffect, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/app/slices/authSlice";
const SignUp = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                await dispatch(register({ username, password })).unwrap();
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
            if (charCode === 13) handleRegister();
        },
        [error, loading, handleRegister]
    );

    const resetValues = () => {
        setUsername("");
        setPassword("");
        setRePassword("");
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
            <h1>Sign Up</h1>
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
            <button
                type="button"
                onClick={handleRegister}
                disabled={loading.auth}
            >
                Sign Up
            </button>
            <button onClick={resetValues}>Reset Values</button>
            <Link to="/login">Already have an account? Login here!</Link>
        </div>
    );
};
export default SignUp;
