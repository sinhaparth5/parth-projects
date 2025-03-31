export interface RegisterFormData {
    email: string;
    password: string;
    username: string;
    role?: 'admin' | 'user';
}

export interface LoginFormData {
    email: string;
    password: string;
}