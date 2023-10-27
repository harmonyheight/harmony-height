"use client"
import Layout from "@/components/auth/Layout";
import ProfileCard from "@/components/auth/ProfileCard";
import withAuth from "@/components/auth/withAuth";
import React from "react";

const ProfilePage = () => {
    return <div>
        <ProfileCard />
    </div>;
};

export default withAuth(ProfilePage);
