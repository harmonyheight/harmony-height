"use client"
import withAuth from "@/components/auth/withAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSellerOrdersAsync } from "@/store/thunks/orderThunks";
import React from "react";

const OrdersPage = () => {
    const [tab, setTab] = React.useState("sold");
    const dispatch = useAppDispatch();
    const { orders, pagination, loading, error } = useAppSelector(state => state.orders);
    const [currentPage, setCurrentPage] = React.useState(1);
    React.useEffect(() => {
        dispatch(getSellerOrdersAsync({
            page: currentPage,
            pageSize: 10,
            type: tab
        }))
    }, [dispatch, currentPage, tab])
    return <div>
        <div className=" mx-auto m-8">
            <h1 className="text-2xl font-bold mb-4">Orders Analytics</h1>
            <div className="stats ">

                <div className="stat place-items-center">
                    <div className="stat-title">Total {tab == "sold" ? "Sold" : "Purchased"}</div>
                    <div className="stat-value">{pagination.totalDocs}</div>
                </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div role="tablist" className="tabs tabs-boxed my-5 bg-yellow-100">
                <a role="tab" className={`tab ${tab == "sold" && "tab-active"}`} onClick={() => setTab("sold")}>Sold</a>
                <a role="tab" className={`tab ${tab == "purchased" && "tab-active"}`} onClick={() => setTab("purchased")}>Purchased</a>
            </div>
            <React.Fragment>
                <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative table">
                        <thead>
                            <tr className="text-left">
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Buyer</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Seller</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Listing</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Amount Total</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Payment Intent</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Status</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Payment Status</th>
                                <th className="py-2 px-3 sticky top-0 border-b bg-primary text-accent">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length > 0 ?

                                    orders.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border-t border-gray-200">{item.buyer.name}</td>
                                            <td className="border-t border-gray-200">{item.seller.name}</td>
                                            <td className="border-t border-gray-200">{item.listing?.zipcode}, {item.listing?.city}, {item.listing?.state} </td>
                                            <td className="border-t border-gray-200">${item.amount_total / 100}</td>
                                            <td className="border-t border-gray-200">{item.paymentIntent}</td>
                                            <td className="border-t border-gray-200">{item.status}</td>
                                            <td className="border-t border-gray-200">{item.payment_status}</td>
                                            <td className="border-t border-gray-200">{new Date(item.createdAt).toISOString().split('T')[0]}</td>
                                        </tr>
                                    ))
                                    : loading && <span className="loading loading-dots loading-lg"></span>
                            }

                        </tbody>
                    </table>

                    <div className="w-full items-center justify-center flex mt-4">
                        {loading && <span className="loading loading-dots loading-lg"></span>}
                        {

                            loading == false && orders.length == 0 && "NO RECORD FOUND"
                        }
                    </div>
                </div>

                {orders.length > 0 &&
                    <div className="w-full flex justify-between items-center my-4">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!pagination.hasNextPage} className="btn btn-secondary">Previous</button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!pagination.hasPrevPage} className="btn btn-primary">Next</button>
                    </div>
                }
            </React.Fragment>
        </div>

    </div>;
};

export default withAuth(OrdersPage);
