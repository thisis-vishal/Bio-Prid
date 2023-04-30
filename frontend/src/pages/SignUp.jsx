import { React, useEffect } from "react";
import styles from "../style";
import { Navbar, SignUpForm } from "../components";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {

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
                        <Navbar signed={props.signed}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-auto w-full p-16">
                <div className="h-full">
                    <div className="grid grid-cols-3 h-full">
                        <div className="col-span-3 flex justify-center items-center place-items-center">
                            <div className="min-w-[450] px-8">
                                <div className="mb-8">
                                    <h1 className="font-poppins font-medium text-center">Create New Account</h1>
                                </div>
                                <SignUpForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp