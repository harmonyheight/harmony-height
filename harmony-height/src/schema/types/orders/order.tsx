
export interface OrderDocument {
    _id: string;
    buyer: {
        _id: string;
        email: string;
        name: string;
        isEmailVerified: boolean;
        verificationCode: string;
        stripeAccountId: string;
        stripeProfileComplete: boolean;
        isAdmin: string;
        password: string;
        __v: number;
    };
    seller: {
        _id: string;
        email: string;
        name: string;
        isEmailVerified: boolean;
        verificationCode: string;
        stripeAccountId: string;
        stripeProfileComplete: boolean;
        isAdmin: string;
        password: string;
        __v: number;
    };
    listing: {
        _id: string;
        state: string;
        price: number;
        city: string;
        bathrooms: number;
        area: number;
        spaces: number;
        bedrooms: number;
        type: string;
        lease: boolean;
        leasePeroid: string;
        parking: boolean;
        water: boolean;
        electricity: boolean;
        wifi: boolean;
        oldYear: number;
        zipcode: string;
        user: string;
        images: string[];
        createdAt: string;
        __v: number;
        sold: boolean;
    };
    amount_total: number;
    paymentIntent: string;
    status: string;
    payment_status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PaginatedOrderResponse {
    docs: OrderDocument[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null | number;
    nextPage: null | number;
}
