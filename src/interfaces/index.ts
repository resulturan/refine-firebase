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

export { IRefineFirebase };
export { IPropsDatabase, ICustomMethod, IGetList, IGetMany, IGetOne, IDeleteManyData, IDeleteData, IUpdateManyData, IUpdateData, ICreateData } from "./IDataBase";
export { ILoginArgs, ILoginProps, IRegisterProps, IRegisterArgs, IUser, IAuthCallbacks, IAuthContext, TLogoutData } from "./ILogin";
export { IDataContextProvider, CrudOperators } from "./IDataContext";