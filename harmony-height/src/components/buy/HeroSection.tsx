import React from "react";

const HeroSection = () => {
    return <div className="hero min-h-screen bg-stone-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img src="/home1.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            <div className="w-[100%]">
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <div className="w-[85%]">
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    </div>
        ;
};

export default HeroSection;
