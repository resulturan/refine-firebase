"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuth = void 0;
const auth_1 = require("firebase/auth");
class FirebaseAuth {
    auth;
    authActions;
    constructor(authActions) {
        this.auth = (0, auth_1.getAuth)();
        this.auth.useDeviceLanguage();
        this.getAuthProvider = this.getAuthProvider.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.onUpdateUserData = this.onUpdateUserData.bind(this);
        this.getUserIdentity = this.getUserIdentity.bind(this);
        this.handleCheckAuth = this.handleCheckAuth.bind(this);
        this.createRecaptcha = this.createRecaptcha.bind(this);
        this.getPermissions = this.getPermissions.bind(this);
        this.authActions = authActions;
    }
    async handleLogOut() {
        await (0, auth_1.signOut)(this.auth);
        await this.authActions?.onLogout?.(this.auth);
    }
    async handleRegister(args, recaptchaVerifier) {
        try {
            const { email, password, displayName } = args;
            const token = await recaptchaVerifier.verify();
            if (token) {
                const userCredential = await (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
                await (0, auth_1.sendEmailVerification)(userCredential.user);
                if (userCredential.user) {
                    if (displayName) {
                        await (0, auth_1.updateProfile)(userCredential.user, { displayName });
                    }
                    this.authActions?.onRegister?.(userCredential.user);
                }
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async handleLogIn({ email, password, remember }) {
        try {
            if (this.auth) {
                await this.auth.setPersistence(remember ? auth_1.browserLocalPersistence : auth_1.browserSessionPersistence);
                const userCredential = await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
                const userToken = await userCredential?.user?.getIdToken?.();
                if (userToken) {
                    this.authActions?.onLogin?.(userCredential.user);
                }
                else {
                    await Promise.reject();
                }
            }
            else {
                await Promise.reject();
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    handleResetPassword(email) {
        return (0, auth_1.sendPasswordResetEmail)(this.auth, email);
    }
    async onUpdateUserData(args) {
        try {
            if (this.auth?.currentUser) {
                const { displayName, email, password } = args;
                if (password) {
                    await (0, auth_1.updatePassword)(this.auth.currentUser, password);
                }
                if (email && this.auth.currentUser.email !== email) {
                    await (0, auth_1.updateEmail)(this.auth.currentUser, email);
                }
                if (displayName && this.auth.currentUser.displayName !== displayName) {
                    await (0, auth_1.updateProfile)(this.auth.currentUser, { displayName: displayName });
                }
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getUserIdentity() {
        const user = this.auth?.currentUser;
        return {
            ...this.auth.currentUser,
            email: user?.email || "",
            name: user?.displayName || ""
        };
    }
    async handleCheckAuth() {
        if (!this.auth?.currentUser) {
            await Promise.reject();
        }
    }
    async getPermissions() {
        if (this.auth) {
            Promise.resolve();
        }
        else {
            Promise.reject();
        }
    }
    createRecaptcha(containerOrId, parameters) {
        return new auth_1.RecaptchaVerifier(containerOrId, parameters, this.auth);
    }
    getAuthProvider() {
        return {
            login: this.handleLogIn,
            logout: this.handleLogOut,
            checkAuth: this.handleCheckAuth,
            checkError: () => Promise.resolve(),
            getPermissions: this.getPermissions,
            getUserIdentity: this.getUserIdentity,
        };
    }
}
exports.FirebaseAuth = FirebaseAuth;
//# sourceMappingURL=firebaseAuth.js.map