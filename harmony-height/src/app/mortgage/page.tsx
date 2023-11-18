import Form from "@/components/mortgage/Form";
import Header from "@/components/mortgage/Header";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const page = () => {
    return (
        <div className="overflow-hidden">
            <NavBar />
            <Header />
            <Form />
        </div>
    );
};

export default page;
