import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useNavigate();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below).
    const [favoriteFood, setFavoriteFood] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [bio, setBio] = useState("");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        alert("Save functionality not implemented yet");
    };

    const logOut = () => {
        alert("Log out functionality not implemented yet");
    };

    const resetValues = () => {
        alert("Reset functionality not implemented yet");
    };

    return (
        <div className="content-container">
            <h1>Info for ______</h1>
            {showSuccessMessage && (
                <div className="success">Successfully saved user data!</div>
            )}
            {showErrorMessage && (
                <div className="fail">
                    Uh oh... something went wrong and we couldn't save changes
                </div>
            )}
            <label>
                Favorite Food:
                <input
                    onChange={(e) => setFavoriteFood(e.target.value)}
                    value={favoriteFood}
                />
            </label>
            <label>
                Hair Color:
                <input
                    onChange={(e) => setHairColor(e.target.value)}
                    value={hairColor}
                />
            </label>
            <label>
                Bio:
                <input onChange={(e) => setBio(e.target.value)} value={bio} />
            </label>
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default UserInfoPage;
