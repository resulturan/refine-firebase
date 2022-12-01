import { Auth, User } from "firebase/auth";

declare interface ILoginArgs {
    email: string;
    password: string;
    remember: boolean;
}

declare interface ILoginProps {
    setLocation: (location: string) => void;
}

declare interface IRegisterProps {
    setReCaptchaContainer: (ref: any) => void;
}

declare interface IRegisterArgs extends ILoginArgs {
    phone?: string;
    displayName?: string;
}

declare interface IUser extends Partial<User> {
    email: string;
    name?: string;
}

declare interface IAuthCallbacks {
    onRegister?: (user: User) => void;
    onLogin?: (user: User) => void;
    onLogout?: (auth: Auth) => any;
}

declare type TLogoutData = void | false | string;
declare interface IAuthContext {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<TLogoutData>;
    checkAuth: (params?: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params?: any) => Promise<any>;
    getUserIdentity?: () => Promise<any>;
    isProvided?: boolean;
    [key: string]: any;
}

export type { ILoginArgs, ILoginProps, IRegisterProps, IRegisterArgs, IUser, IAuthCallbacks, IAuthContext, TLogoutData };