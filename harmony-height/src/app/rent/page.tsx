"use client"
import withAuth from "@/components/auth/withAuth";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const RentPage = () => {
    return <div>
        <NavBar />
    </div>;
};

export default withAuth(RentPage);
