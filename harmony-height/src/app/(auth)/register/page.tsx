"use client"
import { registerFormData, registerSchema } from "@/schema/zod/login";
import { useAppDispatch } from "@/store/hooks";
import { userLoginAsync, userRegisterAsync } from "@/store/thunks/userAuthThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<registerFormData>({
        resolver: zodResolver(registerSchema),
    });
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const onSubmit: SubmitHandler<registerFormData> = async (data) => {
        console.log(data);
        await dispatch(userRegisterAsync(data)).unwrap().then((originalPromiseResult) => {
            // handle result here
            console.log("originalPromiseResult", originalPromiseResult)
            alert(originalPromiseResult.message)
            push("/login")
        }).catch((rejectedValueOrSerializedError) => {
            alert(rejectedValueOrSerializedError)
        });
    };
    const handleLoginPageNavigate = () => {
        push('/login')
    }
    return (
        <div className="flex min-w-full items-center justify-center flex-col h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="card-body">

                        <h2 className="card-title">USER REGISTRATION</h2>
                        <hr />

                        <div className="indicator mt-5">
                            <span className="indicator-item badge bg-red-600 text-white">Required</span>
                            <input type="text" placeholder="Enter your name" className="input input-bordered" {...register('name', { required: 'Name is required' })} />
                        </div>
                        {errors.name && <span className="text-red-600">{errors.name.message}</span>}

                        <div className="indicator mt-5">
                            <span className="indicator-item badge bg-red-600 text-white">Required</span>
                            <input type="text" placeholder="Enter email address" className="input input-bordered" {...register('email', { required: 'Email is required' })} />
                        </div>
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}

                        <div className="indicator  mt-5">
                            <span className="indicator-item badge bg-red-600 text-white">Required</span>
                            <input type="password" placeholder="Enter password" className="input input-bordered"  {...register('password', { required: 'Password is required' })} />
                        </div>
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        <div className="card-actions justify-start">
                            <button className="btn btn-primary mt-4" type="submit">Register</button>
                        </div>
                        <div className="text-blue-800 cursor-pointer pt-3" onClick={handleLoginPageNavigate}>Already have an account? Login</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
