"use client"
import withAuth from "@/components/auth/withAuth";
import { newListingFormData, newListingSchema } from "@/schema/zod/newListing";
import { useAppDispatch } from "@/store/hooks";
import { fetchCountryStatesAsync, fetchStateCitiesAsync, getAuthAccessTokenAsync } from "@/store/thunks/propertyListingThunk";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Fragment, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddNewListingPage = () => {
    const [states, setStates] = useState([
        { state_name: 'Alberta' },
    ]);
    const [cities, setCities] = useState([
        { city_name: 'Alberta' },
    ]);
    const [selectedState, setSelectedState] = useState(states[0])
    const [selectedCity, setSelectedCity] = useState(cities[0])

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        setValue,
        watch,
        formState: { errors },
    } = useForm<newListingFormData>({
        resolver: zodResolver(newListingSchema),
    });
    const onSubmit: SubmitHandler<newListingFormData> = async (data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
    }
    const handleReset = () => {
        reset(); // Clear form values
        clearErrors(); // Clear validation errors
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAuthAccessTokenAsync())
        dispatch(fetchCountryStatesAsync()).unwrap().then((originalPromiseResult) => {
            // handle result here
            if (originalPromiseResult) {
                setStates(originalPromiseResult)
            }
        }).catch((rejectedValueOrSerializedError) => {

        });
        dispatch(fetchStateCitiesAsync({ state: 'Alberta' })).unwrap().then((originalPromiseResult) => {
            // handle result here
            if (originalPromiseResult) {
                setCities(originalPromiseResult)
            }
        }).catch((rejectedValueOrSerializedError) => {

        });
    }, []);
    const handleState = async (state: string) => {
        setValue('city', '');
        setValue('state', state);
        await dispatch(fetchStateCitiesAsync({ state })).unwrap().then((originalPromiseResult) => {
            // handle result here
            if (originalPromiseResult) {
                setCities(originalPromiseResult)
            }
        }).catch((rejectedValueOrSerializedError) => {

        });
    }
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };
    return <div className="justify-center items-center flex w-full bg-secondary-primary mt-5 shadow-sm flex-col">
        <span className="text-xl font-semibold">ADD NEW LISTING </span>
        <hr className="border-t-2 border-gray-300 my-4 w-[80%] mx-auto" />
        <div className="justify-end flex flex-row w-[80%]">

            <button className="btn btn-secondary mt-4 text-sm btn-sm" onClick={handleReset} >RESET</button>
        </div>
        <form className="py-5 flex-col justify-center flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3 flex-col flex">
                <div className="carousel carousel-center w-[30vw] p-4 space-x-6  h-[30vh] rounded-box bg-primary">
                    <div className="carousel-item">
                        <img src="/home1.jpg" alt="Pizza" className="rounded-md" />
                    </div>
                    <div className="carousel-item">
                        <img src="/home1.jpg" alt="Pizza" className="rounded-md" />

                    </div>
                    <div className="carousel-item">
                        <img src="/home1.jpg" alt="Pizza" className="rounded-md" />
                    </div>

                </div>
                <input type="file" className="file-input file-input-ghost  max-w-xs mt-2"
                    multiple
                    accept="image/*" />
            </div>
            <div className="my-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Select State</label>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn w-full btn-ghost border-primary">{watch("state") ? watch("state") : 'Select State'}</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full h-64 border overflow-auto">
                        {
                            states.map((state, index) => (<li onClick={() => handleState(state.state_name)} key={index}><a>{state.state_name}</a></li>))
                        }
                    </ul>
                </div>
                {errors.state && <span className="text-red-600">{errors.state.message}</span>}
            </div>
            {
                cities.length > 0 && <div className="my-3 flex-col flex">
                    <label className="label-text text-base font-semibold pb-1">Select City</label>
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn w-full btn-ghost border-primary">{watch("city") ? watch("city") : 'Select City'}</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full h-64 border overflow-auto">
                            {
                                cities.map((city, index) => (<li onClick={() => setValue("city", city.city_name)} key={index}><a>{city.city_name}</a></li>))
                            }
                        </ul>
                    </div>
                    {errors.city && <span className="text-red-600">{errors.city.message}</span>}
                </div>
            }
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">ZIP Code</label>
                <div>
                    <input type="text" placeholder="Enter zip code here" className={`input input-bordered ${errors.zipcode ? "input-error" : 'input-accent'}`}  {...register('zipcode', { required: 'ZIP Code is required' })} />
                </div>
                {errors.zipcode && <span className="text-red-600">{errors.zipcode.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Year built <span className="badge">year</span></label>
                <div >
                    <input type="text" placeholder="Enter property built year" className={`input input-bordered  ${errors.oldYear ? "input-error" : 'input-accent'}`}  {...register('oldYear', { required: 'Built year is required' })} />
                </div>
                {errors.oldYear && <span className="text-red-600">{errors.oldYear.message}</span>}
            </div>
            <div className="my-3 flex-col flex">
                {/* <label className="label-text text-base font-semibold pb-1">Bathrooms</label>
                <div className="indicator -z-40">
                    <span className="indicator-item badge bg-red-600 text-white">Required</span>
                    <input type="number" placeholder="Enter bathrooms number" className={`input input-bordered  ${errors.bathrooms ? "input-error" : 'input-accent'}`}  {...register('bathrooms', { required: 'Bathrooms field is required' })} />
                </div>
                {errors.bathrooms && <span className="text-red-600">{errors.bathrooms.message}</span>} */}
                <label className="label-text text-base font-semibold pb-1">Select Property Type</label>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn w-full btn-ghost border-primary">{watch("propertyType") ? watch("propertyType") : 'SELECT'}</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                        <li onClick={() => setValue('propertyType', "buy")}><a>Sell</a></li>
                        <li onClick={() => setValue('propertyType', "rent")}><a>Rent</a></li>
                    </ul>
                </div>
                {errors.propertyType && <span className="text-red-600">{errors.propertyType.message}</span>}
            </div>

            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Bedrooms</label>
                <input type="number" placeholder="Enter bedrooms number" className={`input input-bordered  ${errors.bedrooms ? "input-error" : 'input-accent'}`}  {...register('bedrooms', { required: 'Bedrooms field is required' })} />
                {errors.bedrooms && <span className="text-red-600">{errors.bedrooms.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Bathrooms</label>
                <div>
                    <input type="number" placeholder="Enter bathrooms number" className={`input input-bordered  ${errors.bathrooms ? "input-error" : 'input-accent'}`}  {...register('bathrooms', { required: 'Bathrooms field is required' })} />
                </div>
                {errors.bathrooms && <span className="text-red-600">{errors.bathrooms.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Property Area <span className="badge badge-xs">in ~sqft</span></label>
                <div>
                    <input type="number" placeholder="Enter property area" className={`input input-bordered  ${errors.area ? "input-error" : 'input-accent'}`}  {...register('area', { required: 'Area field is required' })} />
                </div>
                {errors.area && <span className="text-red-600">{errors.area.message}</span>}
            </div>
            <span className="fon">FACILITIES</span>
            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Parking Facility
                        <span className="badge badge-xs bg-red-400 absolute"></span>
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('parking')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            <div className="flex flex-row justify-evenly">
                <button className="btn btn-primary mt-4 text-base btn-md" type="submit">ADD</button>
            </div>
        </form>
    </div>;
};

export default withAuth(AddNewListingPage);
