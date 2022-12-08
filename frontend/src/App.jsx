import Router from "./router";
import { Provider } from "react-redux";
import store from '@/app/store';

const App = () => {
    return (
        <Provider store={store}>
            <div className="page-container">
                <Router />
            </div>
        </Provider>
    );
};

export default App;
