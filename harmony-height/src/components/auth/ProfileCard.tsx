"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserListingTypeCountAsync } from "@/store/thunks/propertyListingThunk";
import React from "react";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
import { BsFillHeartFill, BsFillBuildingsFill } from 'react-icons/bs'
import { GiHouseKeys } from 'react-icons/gi'
import axiosUserInstance from "@/store/api/axiosUserInstance";
import { updateStripeAccount } from "@/store/reducers/userAuthSlice";
import { checkIncompleteSetupAsync, getIncompleteAccountLinkAsync } from "@/store/thunks/userAuthThunk";
const ProfileCard = () => {
    const { user } = useAppSelector(state => state.auth)
    const { userListingTypeCount, loading } = useAppSelector(state => state.userlistings)
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getUserListingTypeCountAsync())
    }, [dispatch])
    const handleConnect = async () => {
        try {
            const response = await axiosUserInstance.get('/connect');
            dispatch(updateStripeAccount({ id: response.data.stripeAccountId }))
            // Redirect to the provided account link URL or handle it in your application
            localStorage.setItem('accountLink', response.data.accountLink);
            window.location.href = response.data.accountLink;

        } catch (error: any) {
            console.error('Error connecting Stripe account:', error.message);
        }
    }
    window.addEventListener('popstate', async () => {
        // Retrieve the account link URL from local storage or state
        const accountLink = localStorage.getItem('accountLink');

        if (accountLink) {
            dispatch(checkIncompleteSetupAsync());
            // Dispatch your action or handle the user's return as needed
            console.log('User returned from account link:', accountLink);

            // Clear the stored account link
            localStorage.removeItem('accountLink');
        }
    });
    const handleGetLink = async () => {
        dispatch(getIncompleteAccountLinkAsync()).unwrap().then((originalPromiseResult) => {
            window.location.href = originalPromiseResult?.accountLink;
        }).catch((rejectedValueOrSerializedError) => {
        });
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mt-5 p-5 md:grid-cols-1">
            <div className="rounded-sm flex flex-row p-5 shadow-sm">
                <div className="avatar flex flex-col placeholder">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697932800&semt=sph" />

                        {/* <span className="text-3xl text-primary">{user?.name[0]}</span>   */}
                    </div>
                    <button className="btn btn-xs btn-primary mt-3">Edit</button>
                </div>
                <div className="w-full pl-5 flex flex-col">
                    <span className="capitalize font-semibold text-base">{user?.name}</span>
                    <span className="capitalize font-extralight">{user?.email}</span>
                    <span className="capitalize font-extralight">Status: {user?.isEmailVerified ? "verifried" : "unverifried"}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mt-4">
                <div className="stats shadow bg-blue-50">
                    {
                        user?.stripeAccountId ?

                            user?.stripeProfileComplete ?
                                <div className="stat">
                                    <div className="stat-figure text-accent text-5xl">
                                        <MdOutlineCreditScore />
                                    </div>
                                    <div className="stat-title">Stripe Payment</div>
                                    <div className="stat-desc">Account ID: {user?.stripeAccountId}</div>
                                </div>
                                :
                                <div className="stat">
                                    <div className="stat-figure text-accent text-5xl">
                                        <MdOutlineCreditCardOff />
                                    </div>
                                    <div className="stat-title">Complete Stripe Profile</div>
                                    <div className="stat-value"> <button className="btn btn-xs btn-primary px-10 mt-3" onClick={handleGetLink}>Complete Profile</button></div>
                                </div>
                            :
                            <div className="stat">
                                <div className="stat-figure text-accent text-5xl">
                                    <MdOutlineCreditCardOff />
                                </div>
                                <div className="stat-title">Stripe Payment</div>
                                <div className="stat-value"> <button className="btn btn-xs btn-primary px-10 mt-3" onClick={handleConnect}>Account Enable</button></div>
                            </div>


                    }
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4">
                <div className="stats shadow bg-orange-300">
                    <div className="stat">
                        <div className="stat-figure text-accent text-5xl">
                            <BsFillHeartFill />
                        </div>
                        <div className="stat-title">Favorite Listings</div>
                        <div className="stat-value">16</div>
                        <div className="stat-desc">You are interested in other lisiting.</div>
                    </div>
                </div>
                <div className="stats shadow bg-green-200 text-neutral">
                    <div className="stat text-accent">
                        <div className="stat-figure text-accent text-5xl">
                            <BsFillBuildingsFill />
                        </div>

                        <div className="stat-title text-accent">Total sale Properties</div>
                        {
                            loading ? <span className="loading loading-dots loading-md"></span> :
                                <div className="stat-value text-accent">{userListingTypeCount?.totalSellType}</div>
                        }
                        <div className="stat-desc text-accent">Your total properties for sale</div>
                    </div>
                </div>
                <div className="stats shadow">


                    <div className="stat bg-red-200">
                        <div className="stat-figure text-accent text-5xl">
                            <GiHouseKeys />
                        </div>
                        <div className="stat-title text-accent">Total Rented Properties</div>
                        {
                            loading ? <span className="loading loading-dots loading-md"></span> :
                                <div className="stat-value text-accent">{userListingTypeCount?.totalRentType}</div>
                        }
                        <div className="stat-desc text-accent">Your total properties for rent</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
