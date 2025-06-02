import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { authService } from "./appwrite/services/auth";
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
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
    }, []);

    return (
        <>
            <div className="flex min-h-screen flex-wrap content-between bg-gray-500">
                <div className="block w-full">
                    <Header />
                    <main>
                        {/* {loading && (
                            <p className="text-8xl text-green-400">Loading</p>
                        )} */}
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
