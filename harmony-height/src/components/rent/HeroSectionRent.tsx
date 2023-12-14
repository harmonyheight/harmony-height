import Link from "next/link";
import React from "react";

const HeroSectionRent = () => {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(/herosection-rent.jpg)' }}>
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-0 p-0">
          <form className="card-body  m-0 p-0 rounded-md overflow-hidden">
            <img
              src="/hero-image1.jpg"
              alt="Description"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </form>
        </div>
        <div className="text-center lg:text-left ">
          <center>
            <h1 className="text-5xl font-bold">Exclusive Rental Opportunities</h1>
            <p className="py-6">Embark on a journey to uncover exclusive rental opportunities that cater to your unique lifestyle. From chic urban apartments to cozy suburban retreats, our listings showcase a diverse range of homes designed for modern living</p>
            <Link href="/rent/all" className="btn btn-primary my-4 px-3">EXPLORE</Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionRent;
