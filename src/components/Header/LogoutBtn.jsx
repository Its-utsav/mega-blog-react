import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authService } from "../../appwrite/services/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        });
    };
    return (
        <Button type="button" onClick={logoutHandler}>
            Logout
        </Button>
    );
};
export default LogoutBtn;
