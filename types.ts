export type BackendError = { message: string };

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
};

export type Users = {
    data: User[];
    total: number;
};
