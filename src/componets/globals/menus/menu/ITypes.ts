export interface IUser {
    email: string;
    photo: string;
    name: string;
    blocked: boolean;
    password?: string;
    id?: number;
}