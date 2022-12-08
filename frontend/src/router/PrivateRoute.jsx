import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ability from "@/app/ability";
import { fetchUserData } from "@/app/slices/authSlice";
const PrivateRoute = ({ routes }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, userData } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    // // REDIRECT BACK WHEN USER HAS PERMISSION VIEW PREV PAGE
    // const { permission: permissionFrom, module: moduleFrom } =
    //     routes.find(({ path }) => path?.replace(":id", id) === state?.from) ||
    //     {};
    // if (ability.can(permissionFrom, moduleFrom) && pathname !== state?.from) {
    //     return <Navigate to={state?.from} replace />;
    // }

    // // REDIRECT WHEN USER DON"T HAS PERMISSION VIEW
    // const { permission, module } =
    //     routes.find(({ path }) => path?.replace(":id", id) === pathname) || {};
    // if (ability.cannot(permission, module) && pathname !== "/") {
    //     return <Navigate to="/" replace state={{ from: pathname }} />;
    // }

    if (loading.user) {
        return <div>loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
