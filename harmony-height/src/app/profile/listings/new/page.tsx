/* eslint-disable @next/next/no-img-element */
"use client"
import withAuth from "@/components/auth/withAuth";
import { newListingFormData, newListingSchema } from "@/schema/zod/newListing";
import { useAppDispatch } from "@/store/hooks";
import { fetchCountryStatesAsync, fetchStateCitiesAsync, getAuthAccessTokenAsync } from "@/store/thunks/propertyListingThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { Fragment, useState, useEffect, ChangeEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify'
const AddNewListingPage = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [states, setStates] = useState([
        { state_name: 'Alberta' },
    ]);
    const [cities, setCities] = useState([
        { city_name: 'Alberta' },
    ]);
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
        if (selectedImages.length == 0) {
            toast.warning("Please select images")
        } else {
            console.log('====================================');
            console.log("Images", selectedImages)
            console.log(data);
            console.log('====================================');
            await axios.post('http://api.harmonyheightsresidences.com:8080/api/create-listing', {
                ...data,
                images: selectedImages
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
                    "Accept": "application/json"
                }
            }).then(response => {
                // Handle the response
                console.log('====================================');
                console.log("added ==> ", response.data);
                console.log('====================================');
                toast.success(response.data?.message)
                reset(); // Clear form values
                clearErrors(); // Clear validation errors
                setSelectedImages([])
            })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
    }
    const handleReset = () => {
        reset(); // Clear form values
        clearErrors(); // Clear validation errors
        setSelectedImages([])
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

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((imageFile, index) => {
                formData.append(`images`, imageFile, imageFile.name);
            });

            await axios.post('http://api.harmonyheightsresidences.com:8080/api/listing/new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // Handle the response
                    console.log(response.data);
                    toast.success(response.data?.message)
                    setSelectedImages(response.data?.images);
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });

        }
    };
    const handleImageRemove = async (index: number) => {
        const updatedImages = [...selectedImages];
        await axios.post('http://api.harmonyheightsresidences.com:8080/api/delete-image', {
            imageUrl: selectedImages[index]
        })
            .then(response => {
                // Handle the response
                console.log(response.data);
                toast.success(response.data?.message)
                setSelectedImages(response.data?.images);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };
    return <div className="justify-center items-center flex w-full bg-secondary-primary mt-5 shadow-sm flex-col">
        <span className="text-xl font-semibold">ADD NEW LISTING </span>
        <hr className="border-t-2 border-gray-300 my-4 w-[80%] mx-auto" />
        <div className="justify-end flex flex-row w-[80%]">
            <button className="btn btn-secondary mt-4 text-sm btn-sm" onClick={handleReset} >RESET</button>
        </div>
        <form className="py-5 flex-col justify-center flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Property Images</label>
                <div className="carousel carousel-center w-[30vw] p-4 space-x-6  h-[30vh] rounded-box bg-accent">
                    {selectedImages.length > 0 && selectedImages.map((file, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={`${file}`} alt="Pizza" className="rounded-md" />
                            <span className="badge badge-xs rounded-full bg-error text-white p-2 cursor-pointer" onClick={() => handleImageRemove(index)}>X</span>
                        </div>
                    ))}
                </div>
                <div className="w-full my-3 ">
                    {
                        selectedImages.length == 0 && <input
                            type="file"
                            className="file-input file-input-ghost "
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    }
                </div>
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
                <label className="label-text text-base font-semibold pb-1">Price</label>
                <div>
                    <input type="number" placeholder="Enter price here" className={`input input-bordered w-full ${errors.price ? "input-error" : 'input-accent'}`}  {...register('price', { required: 'Price is required', valueAsNumber: true })} />
                </div>
                {errors.price && <span className="text-red-600">{errors.price.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">ZIP Code</label>
                <div>
                    <input type="text" placeholder="Enter zip code here" className={`input input-bordered w-full ${errors.zipcode ? "input-error" : 'input-accent'}`}  {...register('zipcode', { required: 'ZIP Code is required' })} />
                </div>
                {errors.zipcode && <span className="text-red-600">{errors.zipcode.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Year built <span className="badge">year</span></label>
                <div >
                    <input type="text" placeholder="Enter property built year" className={`input input-bordered w-full ${errors.oldYear ? "input-error" : 'input-accent'}`}  {...register('oldYear', { required: 'Built year is required' })} />
                </div>
                {errors.oldYear && <span className="text-red-600">{errors.oldYear.message}</span>}
            </div>
            <div className="my-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Select Property Type</label>
                <div className="dropdown dropdown-hover">
                    <span tabIndex={0} className="btn w-full -z-40 btn-ghost border-primary">{watch("type") ? watch("type") : 'SELECT'}</span>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                        <li onClick={() => setValue('type', "Sell")}><a>Sell</a></li>
                        <li onClick={() => setValue('type', "rent")}><a>Rent</a></li>
                    </ul>
                </div>
                {errors.type && <span className="text-red-600">{errors.type.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Spaces</label>
                <input type="number" placeholder="Enter spaces" className={`input input-bordered w-full ${errors.spaces ? "input-error" : 'input-accent'}`}  {...register('spaces', { required: 'Spaces field is required' })} />
                {errors.spaces && <span className="text-red-600">{errors.spaces.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Bedrooms</label>
                <input type="number" placeholder="Enter bedrooms number" className={`input input-bordered w-full ${errors.bedrooms ? "input-error" : 'input-accent'}`}  {...register('bedrooms', { required: 'Bedrooms field is required' })} />
                {errors.bedrooms && <span className="text-red-600">{errors.bedrooms.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Bathrooms</label>
                <div>
                    <input type="number" placeholder="Enter bathrooms number" className={`input input-bordered  w-full ${errors.bathrooms ? "input-error" : 'input-accent'}`}  {...register('bathrooms', { required: 'Bathrooms field is required' })} />
                </div>
                {errors.bathrooms && <span className="text-red-600">{errors.bathrooms.message}</span>}
            </div>
            <div className="mb-3 flex-col flex">
                <label className="label-text text-base font-semibold pb-1">Property Area <span className="badge badge-xs">in ~sqft</span></label>
                <div>
                    <input type="number" placeholder="Enter property area" className={`input input-bordered w-full ${errors.area ? "input-error" : 'input-accent'}`}  {...register('area', { required: 'Area field is required' })} />
                </div>
                {errors.area && <span className="text-red-600">{errors.area.message}</span>}
            </div>
            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Lease Property
                        <span className="badge badge-xs bg-red-400 absolute"></span>
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('lease')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            {
                watch('lease') === true && <div className="mb-3 flex-col flex">
                    <label className="label-text text-base font-semibold pb-1">Lease Peroid</label>
                    <div>
                        <input type="text" placeholder="Enter lease peroid" className={`input input-bordered w-full ${errors.leasePeroid ? "input-error" : 'input-accent'}`}  {...register('leasePeroid', { required: 'Lease peorid is required' })} />
                    </div>
                    {errors.leasePeroid && <span className="text-red-600">{errors.leasePeroid.message}</span>}
                </div>
            }
            <hr className="border-t-2 border-gray-300 my-4 w-[80%] mx-auto" />
            <span className="font-semibold my-3 align-middle">FACILITIES</span>
            <hr className="border-t-2 border-gray-300 my-4 w-[80%] mx-auto" />

            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Parking Facility
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('parking')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Wifi
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('wifi')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Electricity
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('electricity')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            <div className="form-control my-2">
                <label className="label cursor-pointer">
                    <span className="label-text text-base font-semibold pb-1">
                        Water
                    </span>
                    <input type="checkbox" className="toggle toggle-primary"  {...register('water')} defaultChecked={false} placeholder="YES" />
                </label>
            </div>
            <div className="flex flex-row justify-evenly">
                <button className="btn btn-primary w-full mt-4 text-base btn-md" type="submit">ADD</button>
            </div>
        </form>
    </div>;
};

export default withAuth(AddNewListingPage);
