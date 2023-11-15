import React from "react";

const Loading = () => {
    return <div className="min-w-screen min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    </div>;
};

export default Loading;
