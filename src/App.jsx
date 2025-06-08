import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { authService } from "./appwrite/services/auth";
import { Footer, Header, Loading } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const localUser = localStorage.getItem("userData");
        if (localUser) {
            dispatch(login({ user: JSON.parse(localUser) }));
            setLoading(false);
        } else {
            authService
                .getUserInfo()
                .then((user) => {
                    if (user) {
                        dispatch(login({ user }));
                    } else {
                        dispatch(logout());
                    }
                })
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) return <h1 className="text-center">Restoring session...</h1>;

    return (
        <>
            <div className="bg-primary flex min-h-screen flex-wrap content-between">
                <div className="mx-4 block w-full">
                    <Header />
                    <main>{loading ? <Loading /> : <Outlet />}</main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
