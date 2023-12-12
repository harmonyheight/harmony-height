"use client"
import { TableListings } from "@/components/auth/TableListings";
import withAuth from "@/components/auth/withAuth";
import React from "react";

const ListingsPage = () => {
    return <div>
        <TableListings />
    </div>;
};

export default withAuth(ListingsPage);
