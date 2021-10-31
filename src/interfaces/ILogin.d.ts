import { Auth, User } from "firebase/auth";

interface ILoginArgs {
    email: string;
    password: string;
    remember: boolean;
}

interface ILoginProps {
    setLocation: (location: string) => void;
}

interface IRegisterProps {
    setReCaptchaContainer: (ref: any) => void;
}

interface IRegisterArgs extends ILoginArgs {
    phone?: string;
    displayName?: string;
}

interface IUser extends Partial<User> {
    email: string;
    name?: string;
}

interface IAuthCallbacks {
    onRegister?: (user: User) => void;
    onLogin?: (user: User) => void;
    onLogout?: (auth:Auth) => any;
}

export { ILoginArgs, ILoginProps, IRegisterProps, IRegisterArgs, IUser, IAuthCallbacks };