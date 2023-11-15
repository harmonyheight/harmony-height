"use client"
import React from "react";
const Banner = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date('2023-11-25T23:59:59') - +new Date();
        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
    React.useEffect(() => {
        const timer = setTimeout(() => {

            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    });
    return <div className="flex justify-evenly items-center bg-accent max-md:flex-col">
        <div className="shadow-lg text-white text-center bg-primary py-2 px-6 rounded-lg">
            WORKING ON SPRINT 3 ANNOUNCEMENT
        </div>
        <div className="flex gap-5 bg-accent rounded py-3 items-center justify-center">


            <div className=" text-white">
                <span className="countdown font-mono text-4xl text-white">
                    <span id="counterElement" style={{ "--value": timeLeft.days } as React.CSSProperties}></span>
                </span>
                days
            </div>
            <div className=" text-white">
                <span className="countdown font-mono text-4xl  text-white">
                    <span style={{ "--value": timeLeft.hours } as React.CSSProperties}></span>
                </span>
                hours
            </div>
            <div className=" text-white">
                <span className="countdown font-mono text-4xl  text-white">
                    <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}></span>
                </span>
                min
            </div>
            <div className=" text-white">
                <span className="countdown font-mono text-4xl  text-white">
                    <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}></span>
                </span>
                sec
            </div>
        </div>
    </div>;
};

export default Banner;
