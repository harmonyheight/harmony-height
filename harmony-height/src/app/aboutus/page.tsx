import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import React from "react";
{/* <Image src="/harmonyheightLogo.png" alt="Company Image" className="rounded-lg mb-4" width={150} height={200} /> */ }
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const AboutusPage = () => {
    return <div>
        <NavBar />
        <div className="container mx-auto py-8">

            <h1 className="text-4xl font-bold mb-6">About Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <Image src="/harmonyheightLogo.png" alt="Company Image" className="rounded-lg mb-4" width={150} height={200} />
                </div>

                <div>
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to Harmony Heights, your one-stop destination for all your property needs. Our mission is to simplify the process of buying, selling, and renting properties while providing exceptional service and expertise.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        With a team of dedicated professionals, we strive to create a seamless and enjoyable experience for our clients. Whether you are looking to find your dream home, list a property, or make a real estate investment, we are here to guide you every step of the way.
                    </p>
                </div>

            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-700">Feel free to reach out to us for any inquiries or assistance. We are here to help!</p>

                <div className="mt-4 flex items-center">
                    <i className="fas fa-map-marker-alt text-xl text-gray-600"></i>
                    <p className="ml-2">123 Main Street, Cityville, State, 12345</p>
                </div>

                <div className="mt-2 flex items-center">
                    <i className="fas fa-phone-alt text-xl text-gray-600"></i>
                    <p className="ml-2">Phone: (123) 456-7890</p>
                </div>

                <div className="mt-2 flex items-center">
                    <i className="fas fa-envelope text-xl text-gray-600"></i>
                    <p className="ml-2">Email: info@yourrealestatepartner.com</p>
                </div>
            </div>

            <div className="mt-8 flex items-center space-x-4">
                <a href="#" target="_blank" title="Follow us on Facebook"><FaFacebook className="text-2xl text-blue-600" /></a>
                <a href="#" target="_blank" title="Follow us on Twitter"><FaTwitter className="text-2xl text-blue-400" /></a>
                <a href="#" target="_blank" title="Connect with us on LinkedIn"><FaLinkedin className="text-2xl text-blue-800" /></a>
                {/* Add more social icons as needed */}
            </div>
        </div>
    </div>;
};

export default AboutusPage;
