export type BackendError = { message: string };

export type UserSummary = {
    id: string;
    title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
    firstName: string;
    lastName: string;
    picture: string;
};
export type UserFull = UserSummary & {
    gender: "male" | "female" | "other" | "";
    email: string;
    dateOfBirth: string;
    registerDate: string;
    phone: string;
    location: {
        street: string;
        city: string;
        state: string;
        country: string;
        timezone: string;
    };
};
export type Users = {
    data: UserSummary[];
    limit: number;
    page: number;
    total: number;
};
