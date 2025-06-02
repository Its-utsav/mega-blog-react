import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const Protected = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const localStorageToken = localStorage.getItem("cookieFallback");

    useEffect(() => {
        if (!authStatus && !localStorageToken) {
            // return navigate("/login");
            return <Navigate to="/login" replace={true} />;
        } else if (authStatus) {
            navigate("/");
        }
        setLoading(false);
    }, [authStatus]);

    return <Outlet />;
};

export default Protected;
