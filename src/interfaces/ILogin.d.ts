import { Auth, User } from "firebase/auth";

export interface ILoginArgs {
    email: string;
    password: string;
    remember: boolean;
}

export interface ILoginProps {
    setLocation: (location: string) => void;
}

export interface IRegisterProps {
    setReCaptchaContainer: (ref: any) => void;
}

export interface IRegisterArgs extends ILoginArgs {
    phone?: string;
    displayName?: string;
}

export interface IUser extends Partial<User> {
    email: string;
    name?: string;
}

export interface IAuthCallbacks {
    onRegister?: (user: User) => void;
    onLogin?: (user: User) => void;
    onLogout?: (auth:Auth) => any;
}