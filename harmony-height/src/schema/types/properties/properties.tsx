export interface Listing {
    _id: string;
    price?: string;
    state: string;
    city?: string;
    bathrooms: number;
    area: number;
    spaces: number;
    bedrooms: number;
    type: string;
    lease: boolean;
    leasePeroid?: string; // Make 'leasePeroid' optional
    parking: boolean;
    water: boolean;
    electricity: boolean;
    wifi: boolean;
    oldYear: number;
    zipcode: string;
    user: {
        name: string,
        email: string,
        _id: string
    };
    images: string[];
    createdAt: { $date: string };
    __v: number;
}
export interface UserListingTypeCount {
    totalRentType: number,
    totalSellType: number,
}

export interface CountListingByMonth {
    month: string,
    forSale: number,
    forRent: number
}
export interface UserListingsState {
    userListings: Listing[] | [];
    userListingTypeCount: UserListingTypeCount | null;
    countListingByMonth: CountListingByMonth[] | [];
    loading: boolean;
    error: string | null;
}


export interface HomeListingsState {
    latestListings: Listing[] | [];
    loading: boolean;
    error: string | null;
}