import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const localStorageToken = localStorage.getItem("cookieFallback");

    useEffect(() => {
        if (!authStatus && !localStorageToken) {
            // return navigate("/login");
            navigate("/login");
        }
        //  else if (authStatus) {
        //     navigate("/");
        // }
        setLoading(false);
    }, [authStatus]);

    return loading ? <h1>Loading ......</h1> : <>{children}</>;
};

export default Protected;
