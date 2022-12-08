import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserInfoPage, Login, Signup, NotFound } from "@/pages";
import PrivateRoute from "./PrivateRoute";
import { modules, permissions } from '@/constants';

const routes = {
    public: [
        { path: "/login", exact: true, components: <Login /> },
        { path: "/signup", exact: true, components: <Signup /> },
        { path: "*", components: <NotFound /> },
    ],
    private: [
        {
            path: "/",
            components: <UserInfoPage />,
            exact: true,
			permission: permissions.read,
			module: modules.page,
        },
        { path: "*", components: <NotFound /> },
    ],
};

const renderRouters = routes =>
	routes.map(({ path, components, exact }) => (
		<Route key={path} element={components} exact={exact} path={path} />
	));

const Routers = () => (
    <Router>
        <Routes>
            {renderRouters(routes.public)}
            <Route element={<PrivateRoute routes={routes.private} />}>
                {renderRouters(routes.private)}
            </Route>
        </Routes>
    </Router>
);

export default Routers;
