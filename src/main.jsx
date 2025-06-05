import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Protected from "./components/Protected.jsx";
import AllPost from "./pages/AllPost.jsx";
import PostForm from "./components/PostForm/PostForm.jsx";

const routes = createBrowserRouter(
    // createRoutesFromElements(
    //     <Route path="/" element={<App />}>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />}></Route>
    //         <Route path="/signup" element={<Signup />}></Route>
    //         <Route element={<Protected />}>
    //             <Route path="/all-post" element={<AllPost />} />
    //             {/* <Route path="/add-new-post" element={<PostForm />} /> */}
    //         </Route>
    //     </Route>
    // )
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/login",
                    element: (
                        <Protected>
                            <Login />
                        </Protected>
                    ),
                },
                {
                    path: "/signup",
                    element: (
                        <Protected>
                            <Signup />
                        </Protected>
                    ),
                },
                {
                    path: "/all-post",
                    element: (
                        <Protected>
                            <AllPost />
                        </Protected>
                    ),
                },
                {
                    path: "/add-new-post",
                    element: (
                        <Protected>
                            <PostForm />
                        </Protected>
                    ),
                },
            ],
        },
    ]
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={routes} />
            {/* <App /> */}
        </Provider>
    </StrictMode>
);
