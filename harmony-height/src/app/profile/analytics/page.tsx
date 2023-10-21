"use client"
import Statistics from "@/components/auth/Statistics";
import withAuth from "@/components/auth/withAuth";
import React from "react";

const AnalyticsPage = () => {
    return <div><Statistics />


    </div>;
};

export default withAuth(AnalyticsPage);
