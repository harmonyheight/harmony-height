"use client"
import { verificationCodeSchema, verificationFormData } from "@/schema/zod/login";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emailVerifyAsync } from "@/store/thunks/userAuthThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EmailVerification = ({ routeName }: { routeName: string }) => {
    console.log('====================================');
    console.log("routeName: ", routeName);
    console.log('====================================');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<verificationFormData>({
        resolver: zodResolver(verificationCodeSchema),
    });
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)
    const { push } = useRouter();
    const onSubmit: SubmitHandler<verificationFormData> = async (data) => {

        await dispatch(emailVerifyAsync({
            email: user?.email,
            code: data.verificationCode
        }));
        if (routeName === "login") {
            push('/')
        } else {

            push('/login')
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
                <h2 className="card-title">USER EMAIL VERIFICATION</h2>
                <hr />
                <div className="indicator mt-5">
                    <span className="indicator-item badge bg-red-600 text-white">Required</span>
                    <input type="text" placeholder="Enter email verification code" className="input input-bordered" {...register('verificationCode', { required: 'Code is required' })} />
                </div>
                {errors.verificationCode?.message && <span className="text-red-600">{errors.verificationCode.message}</span>}


                <div className="card-actions justify-start">
                    <button className="btn btn-primary mt-4" type="submit">Verify</button>
                </div>
            </div>
        </form>
    );
};

export default EmailVerification;
