import React from "react";

const LoginPage = () => {
    return (
        <div className="flex min-w-full items-center justify-center flex-col">
            <div className="min-w-full btn-primary h-14 mb-12 items-center justify-start flex">
                <h1 className="pl-5 text-center font-bold text-lg">HARMONY HEIGHT</h1>
            </div>
            <div className="avatar">
                <div className="w-28 rounded-full mb-5">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx72h5u9ci20lUy6l9gY1hrHnEDXcUIrCUvg&usqp=CAU" />
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">USER LOGIN</h2>
                    <hr />
                    <div className="indicator my-5">
                        <span className="indicator-item badge">Required</span>
                        <input type="text" placeholder="Enter email address" className="input input-bordered" />
                    </div>
                    <div className="indicator  my-5">
                        <span className="indicator-item badge">Required</span>
                        <input type="text" placeholder="Enter password" className="input input-bordered" />
                    </div>
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary mt-4">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
