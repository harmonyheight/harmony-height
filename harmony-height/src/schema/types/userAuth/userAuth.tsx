export interface User {
    _id: string;
    email: string;
    name: string;
    __v?: number;
    isEmailVerified: boolean;
}

export interface UserAuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}