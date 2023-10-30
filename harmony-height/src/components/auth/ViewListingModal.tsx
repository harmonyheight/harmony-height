/* eslint-disable @next/next/no-img-element */
import { Listing } from "@/schema/types/properties/properties";
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { deleteUserListing } from "@/store/thunks/propertyListingThunk";
import { toast } from 'react-toastify'
const ViewListingModal = ({ selectedList }: { selectedList: Listing }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const dispatch = useAppDispatch();
    const prevSlide = () => {
        setCurrentSlide((prevIndex) =>
            prevIndex === 0 ? selectedList.images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prevIndex) =>
            prevIndex === selectedList.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const closeModal = () => {
        const modalElement = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modalElement) {
            modalElement.close();
        }

    };
    const handleDeleteListing = async () => {
        await dispatch(deleteUserListing({
            listingId: selectedList._id,
            images: selectedList.images
        })).unwrap().then((originalPromiseResult) => {
            if (originalPromiseResult) {
                toast.success(originalPromiseResult.message)
                closeModal()
            }
        }).catch((rejectedValueOrSerializedError) => {

        });
    }
    return <div>
        <dialog id="my_modal_3" className="modal w-[100vw] h-[80vh]">
            <div className="modal-box w-[80vw] max-w-5xl">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{selectedList.zipcode}, {selectedList.city} {selectedList.state}</h3>
                <figure className="h-full w-full border items-center flex flex-row justify-center">
                    <div className="carousel w-fit h-[40vh] border-b-2">
                        <div className={`carousel-item relative w-full bg-gray-100 group`} >
                            <img src={selectedList.images[currentSlide]} alt={selectedList.images[currentSlide]} className="object-cover h-full w-full" />
                        </div>
                    </div>
                    {
                        selectedList.images.length > 1 && <>
                            <div className="absolute bg-primary p-1 rounded-full right-2  cursor-pointer opacity-70" onClick={nextSlide}>
                                <GoArrowRight className="text-xl" />
                            </div>
                            <div className="absolute bg-primary p-1 rounded-full left-2  cursor-pointer opacity-70" onClick={prevSlide}>
                                <GoArrowLeft className="text-xl" />
                            </div></>
                    }
                </figure>
                <div>
                    <div className="flex justify-between w-full font-normal my-2">
                        <div className="w-full justify-between flex px-1">
                            <span>Listing Proptry Type</span>
                            <span className="font-medium">{selectedList.type}</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full font-normal my-2">
                        <div className="w-full justify-between flex px-1">
                            <span>Price</span>
                            <span className="font-medium">$ {selectedList.price}</span>
                        </div>
                    </div>
                    {
                        selectedList.lease &&
                        <div className="flex justify-between w-full font-normal my-2">
                            <div className="w-full justify-between flex px-1">
                                <span>Lease</span>
                                <span>{selectedList.lease ? "YES" : "NO"}</span>
                            </div>
                            <div className="w-full justify-between flex px-1 border-l">
                                <span>Lease Time</span>
                                <span>{selectedList.leasePeroid}</span>
                            </div>
                        </div>
                    }
                    <div className="flex justify-between w-full font-normal my-2">
                        <div className="w-full justify-between flex px-1">
                            <span>Spaces</span>
                            <span>{selectedList.spaces}</span>
                        </div>
                        <div className="w-full justify-between flex px-1 border-l">
                            <span>Parking</span>
                            <span>{selectedList.parking ? "YES" : "NO"}</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full font-normal my-2">
                        <div className="w-full justify-between flex px-1">
                            <span>Wifi</span>
                            <span>{selectedList.wifi ? "YES" : "NO"}</span>
                        </div>
                        <div className="w-full justify-between flex px-1 border-l">
                            <span>Electricity</span>
                            <span>{selectedList.electricity ? "YES" : "NO"}</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full font-normal my-4">
                        <div className="w-full justify-between flex px-1">
                            <button className="btn btn-error w-full" onClick={() => handleDeleteListing()}> DELETE</button>
                        </div>
                        <div className="w-full justify-between flex px-1 border-l">
                            <button className="btn btn-primary w-full"> EDIT</button>
                        </div>
                    </div>
                </div>

            </div>
        </dialog>
    </div>;
};

export default ViewListingModal;
