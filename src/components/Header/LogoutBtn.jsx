import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/services/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
    return (
        <Button type="button" onClick={logoutHandler}>
            Logout
        </Button>
    );
};
export default LogoutBtn;
