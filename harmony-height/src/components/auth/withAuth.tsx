"use client"
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const { user } = useAppSelector(state => state.auth);
        useLayoutEffect(() => {
            if (!user) {
                return redirect('/login')
            }
        }, [user])
        return <Component {...props} />
    }
}