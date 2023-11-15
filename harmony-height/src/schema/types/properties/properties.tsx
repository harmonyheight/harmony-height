export interface Listing {
    _id: string;
    price?: number;
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

export interface BuyListingsState {
    popularListings: Listing[] | [];
    latestListings: Listing[] | [];
    loading: boolean;
    error: string | null;
}
export interface RentListingsState {
    popularListings: Listing[] | [];
    latestListings: Listing[] | [];
    loading: boolean;
    error: string | null;
}

export interface BuyFilterListingsState {
    listings: {
        listings: Listing[] | [];
        currentPage: number | 0;
        totalPages: number | 0;
        totalListings: number | 0;
    }
    loading: boolean;
    error: string | null;
}