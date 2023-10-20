"use client"
import Layout from "@/components/auth/Layout";
import withAuth from "@/components/auth/withAuth";
import React from "react";

const ProfilePage = () => {
    return <div>

        <h1>Profile</h1>
    </div>;
};

export default withAuth(ProfilePage);
