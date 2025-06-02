import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { authService } from "../appwrite/services/auth";
import { login as userLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

const Login = () => {
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();

    const login = async (data) => {
        /*
            name:value
        */

        setErrors("");
        try {
            const userSession = await authService.login(data);
            if (userSession) {
                const userData = await authService.getUserInfo();
                if (userData) dispatch(userLogin(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setErrors(error.message);
        }
    };

    return (
        <div className="flex w-full items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl leading-tight font-bold">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="text-primary font-medium transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <form onSubmit={handleSubmit(login)}>
                    <div className="space-y-5">
                        <Input
                            label={"Email : "}
                            type="text"
                            placeholder="Enter Your Email"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                    message:
                                        "Entered value does not match email format",
                                },
                            })}
                        />
                    </div>
                    <div className="space-y-5">
                        <Input
                            type="password"
                            label={"Password : "}
                            placeholder="Enter password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="mt-4 w-full border-2">
                            Login
                        </Button>
                    </div>
                    {errors && (
                        <p className="text-center font-bold text-red-400">
                            {errors}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};
export default Login;
