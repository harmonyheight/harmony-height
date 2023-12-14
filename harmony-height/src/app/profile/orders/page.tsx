"use client"
import withAuth from "@/components/auth/withAuth";
import React from "react";

const OrdersPage = () => {
    return <div>
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
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
                        <tr>
                            <td className="border-t border-gray-200">John Doe</td>
                            <td className="border-t border-gray-200">Jane Doe</td>
                            <td className="border-t border-gray-200">Product A</td>
                            <td className="border-t border-gray-200">$100.00</td>
                            <td className="border-t border-gray-200">stripe_payment_intent_id</td>
                            <td className="border-t border-gray-200">created</td>
                            <td className="border-t border-gray-200">pending</td>
                            <td className="border-t border-gray-200">2023-12-14</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>;
};

export default withAuth(OrdersPage);
