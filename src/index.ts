import { initializeApp as initializeFirebase } from "@firebase/app";
import { FirebaseAuth } from "./firebaseAuth";
import { FirebaseDatabase } from "./firebaseDatabase";
import { FirestoreDatabase } from "./FirestoreDatabase";
import { IAuthCallbacks, IPropsDatabase } from "./interfaces";

function useFirestoreDatabase(props?: IPropsDatabase) {
    return new FirestoreDatabase(props);
}

function useFirebaseDatabase(props?: IPropsDatabase) {
    return new FirebaseDatabase(props);
}

function useFirebaseAuth(props?: IAuthCallbacks) {
    return new FirebaseAuth(props);
}

export { initializeFirebase, FirestoreDatabase, FirebaseDatabase, FirebaseAuth };