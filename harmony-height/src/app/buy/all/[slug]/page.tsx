/* eslint-disable @next/next/no-img-element */
"use client"
import DetailProperty from "@/components/detail/DetailProperty";
import ImageGallery from "@/components/detail/ImageGallery";
import NavBar from "@/components/navbar/NavBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyistingsDetail } from "@/store/thunks/buyListingThunk";
import { notFound, useRouter } from 'next/navigation'
import React from 'react';

const BuyPropertyDetail = ({ params }: { params: { slug: string } }) => {

    const [isNotfound, setIsNotFuond] = React.useState(false);
    const dispatch = useAppDispatch();
    const { propertyDetail } = useAppSelector(state => state.buylisting)
    React.useEffect(() => {
        dispatch(getBuyistingsDetail({
            id: params.slug
        })).unwrap().then((originalPromiseResult) => {
        }).catch((rejectedValueOrSerializedError) => {
            setIsNotFuond(true);
        });

    }, [dispatch, params.slug])
    if (isNotfound) {
        notFound()
    }
    return (
        <div>
            <NavBar />
            {
                propertyDetail &&
                <>
                    <ImageGallery images={propertyDetail?.images} />
                    <div className="px-6">

                        <DetailProperty listing={propertyDetail} />
                    </div>
                </>
            }
        </div>
    )
}

export default BuyPropertyDetail;