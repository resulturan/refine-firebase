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
export * from "./IDataBase";
export * from "./ILogin";
export * from "./IDataContext";