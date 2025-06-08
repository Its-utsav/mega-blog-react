import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { authService } from "../appwrite/services/auth";
import { Button, Input, Logo } from "../components";

const Signup = () => {
    const [error, setError] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const displayErrors = () => {
        if (errors) {
            let e = "";
            for (const [key, val] of Object.entries(errors)) {
                if (val.message && val.message !== "") {
                    e += val.message + ". ";
                }
            }
            setError(e);
        }
    };

    const createAccount = async (data) => {
        // console.log(data, errors);
        try {
            const createdUser = await authService.createAccount(data);
            if (createdUser) {
                const user = await authService.getUserInfo();
                if (user) dispatch(login(data));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="my-4 flex w-full items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl leading-tight font-bold">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="text-primary font-medium transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                <form onSubmit={handleSubmit(createAccount, displayErrors)}>
                    <div className="space-y-5">
                        <Input
                            label={"Name : "}
                            type="text"
                            placeholder="Enter Your name"
                            // autoComplete="username"
                            {...register("name", {
                                // required: true,
                                required: {
                                    message: "Name is Required",
                                    value: true,
                                },
                                pattern: {
                                    value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
                                    message: "Enter Valid Name",
                                },
                            })}
                        />
                    </div>
                    <div>
                        <Input
                            label={"Email : "}
                            type="text"
                            placeholder="Enter Your Email"
                            // autoComplete="email"
                            {...register("email", {
                                required: {
                                    message: "Email is Required",
                                    value: true,
                                },
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
                            // autoComplete="current-password"
                            {...register("password", {
                                required: {
                                    message:
                                        "Password length must be minimum 8 character long",
                                    value: true,
                                },
                            })}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="mt-4 w-full border-2">
                            Create Account
                        </Button>
                    </div>
                    {error && (
                        <p className="text-center font-bold text-red-400">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Signup;
