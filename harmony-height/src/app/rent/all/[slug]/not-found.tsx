"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React from "react";
import NavBar from '@/components/navbar/NavBar';
const NotFoundPage = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return <div className='overflow-hidden'>
        <NavBar />
        <div className="min-h-[80vh] w-screen flex justify-center items-center flex-col">
            <Image src="/no-content.png" height={100} width={100} alt="not found image" />
            <div className="mt-4">
                Product Not Found
            </div>
            <button className="btn btn-link" onClick={handleBack}>BACK HOME</button>
        </div>
    </div>;
};

export default NotFoundPage;