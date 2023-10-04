"use client"
import { loginFormData, loginSchema } from "@/schema/zod/login";
import { useAppDispatch } from "@/store/hooks";
import { userLoginAsync } from "@/store/thunks/userAuthThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        console.log(data);
        await dispatch(userLoginAsync(data)).unwrap().then((originalPromiseResult) => {
            // handle result here
            console.log("originalPromiseResult", originalPromiseResult)
            alert(originalPromiseResult.message)
            push("/")
        }).catch((rejectedValueOrSerializedError) => {
            alert(rejectedValueOrSerializedError)
        });
    };
    return (
        <div className="flex min-w-full items-center justify-center flex-col">
            <div className="min-w-full btn-primary h-14 mb-12 items-center justify-start flex">
                <h1 className="pl-5 text-center font-bold text-lg">HARMONY HEIGHT</h1>
            </div>
            <div className="avatar">
                <div className="w-28 rounded-full mb-5">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx72h5u9ci20lUy6l9gY1hrHnEDXcUIrCUvg&usqp=CAU" />
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
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
                            <input type="password" placeholder="Enter password" className="input input-bordered"  {...register('password', { required: 'Password is required' })} />
                        </div>
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        <div className="card-actions justify-start">
                            <button className="btn btn-primary mt-4" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
