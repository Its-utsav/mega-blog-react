import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Button from "../Button";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    // select the status of authentication

    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            url: "/",
            active: true,
        },
        {
            name: "Login",
            url: "/login",
            active: !authStatus, // If user already loggeding then why we are display that button
        },
        {
            name: "Sign up",
            url: "/signup",
            active: !authStatus,
        },
        {
            name: "All Post",
            url: "/all-post",
            active: authStatus,
        },
        {
            name: "Add Post",
            url: "/add-new-post",
            active: authStatus,
        },
        {
            name: "My Post",
            url: "/my-post",
            active: authStatus,
        },
    ];
    return (
        <header className="bg-secondary mt-4 rounded-2xl py-3 shadow">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="ml-auto flex gap-2">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <Button
                                        type="button"
                                        onClick={() => navigate(item.url)}
                                    >
                                        {item.name}
                                    </Button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};
export default Header;
