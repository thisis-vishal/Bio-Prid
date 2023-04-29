import { React, useEffect } from "react";
import styles from "../style";
import { Navbar, SignInForm } from "../components";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {

    // navigator
    const navigate = useNavigate();

    useEffect(() => {
        if (props.signed) {
            navigate("/");
        }
    })
    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-auto w-full p-24">
                <div className="h-full">
                    <div className="grid grid-cols-3 h-full">
                        <div className="col-span-3 flex justify-center items-center place-items-center">
                            <div className="min-w-[450] px-8">
                                <div className="mb-8">
                                    <h1 className="font-poppins font-medium">Welcome Back</h1>
                                    <p className="font-poppins">Please enter your credentials to Sign In!</p>
                                </div>

                                <SignInForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn