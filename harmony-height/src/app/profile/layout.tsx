"use client"
import Layout from "@/components/auth/Layout";
import React from "react";

const ProfileLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <div>
        <Layout>
            {children}
        </Layout></div>;
};

export default ProfileLayout;
