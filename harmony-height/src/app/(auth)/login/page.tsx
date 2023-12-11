/* eslint-disable react/no-unescaped-entities */
"use client"
import EmailVerification from "@/components/auth/EmailVerification";
import NavBar from "@/components/navbar/NavBar";
import { loginFormData, loginSchema } from "@/schema/zod/login";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userLoginAsync } from "@/store/thunks/userAuthThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const [isVerify, setIsVerify] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const dispatch = useAppDispatch();
    const { push } = useRouter();

    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        await dispatch(userLoginAsync(data)).unwrap().then((originalPromiseResult) => {
            // handle result here
            setUserEmail(originalPromiseResult?.user?.email)
            if (originalPromiseResult?.user?.isEmailVerified) {
                push("/")
            }
            else {
                setIsVerify(false)
            }
        }).catch((rejectedValueOrSerializedError) => {

        });
    };
    const handleRegisterPageNavigate = () => {
        push('/register')
    }
    return (
        <>
            <NavBar />
            <div className="flex min-w-full items-center justify-center flex-col h-screen">
                <div className="card w-96 bg-base-100 shadow-xl">
                    {
                        isVerify ?
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body">
                                    <h2 className="card-title">USER LOGIN</h2>
                                    <hr />
                                    <div className="indicator mt-5">
                                        <span className="indicator-item badge bg-red-600 text-white">Required</span>
                                        <input type="text" placeholder="Enter email address" className="input input-bordered" {...register('email', { required: 'Email is required' })} />
                                    </div>
                                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}

                                    <div className="indicator  mt-5">
                                        <span className="indicator-item badge bg-red-600 text-white">Required</span>
                                        <input autoComplete="true" type="password" placeholder="Enter password" className="input input-bordered"  {...register('password', { required: 'Password is required' })} />
                                    </div>
                                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                                    <div className="card-actions justify-start">
                                        <button className="btn btn-primary mt-4" type="submit">Login</button>
                                    </div>

                                    <div className="text-blue-800 cursor-pointer pt-3" onClick={handleRegisterPageNavigate}>Don't have account? Register</div>
                                </div>
                            </form> :
                            <EmailVerification routeName="login" userEmail={userEmail} />
                    }
                </div>
            </div>
        </>
    );
};

export default LoginPage;
