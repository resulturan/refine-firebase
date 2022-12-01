import { FirebaseAuth } from "../firebaseAuth";
import { FirebaseDatabase } from "../firebaseDatabase";
import { FirestoreDatabase } from "../FirestoreDatabase";
import { FirebaseApp } from "@firebase/app";

declare interface IRefineFirebase {
    firebaseApp: FirebaseApp;
    firebaseAuth?: FirebaseAuth;
    firestoreDatabase?: FirestoreDatabase;
    firebaseDatabase?: FirebaseDatabase;
}

export type { IRefineFirebase };
export type { IPropsDatabase, ICustomMethod, IGetList, IGetMany, IGetOne, IDeleteManyData, IDeleteData, IUpdateManyData, IUpdateData, ICreateData } from "./IDataBase";
export type { ILoginArgs, ILoginProps, IRegisterProps, IRegisterArgs, IUser, IAuthCallbacks, IAuthContext, TLogoutData } from "./ILogin";
export type { IDataContextProvider, CrudOperators } from "./IDataContext";