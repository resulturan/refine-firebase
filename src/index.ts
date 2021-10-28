import { FirebaseOptions, initializeApp } from "@firebase/app";
import { FirebaseAuth } from "./firebaseAuth";
import { FirestoreDatabase } from "./firestoreDatabase";
import { FirebaseDatabase } from "./firebaseDatabase";
import { IAuthCallbacks } from "./interfaces/ILogin";

export default function initializeFirebase(
    firebaseConfig: FirebaseOptions,
    options: { useAuth: boolean, useRealtimeDatabase: boolean, useFirestore: boolean, },
    authActions: IAuthCallbacks,
    payloadFactoryMethods: {
        requestPayloadFactory: (resource: string, data: any) => any;
        responsePayloadFactory: (resource: string, data: any) => any;
    }
) {
    var firebaseApp = initializeApp(firebaseConfig);

    if (options.useAuth) {
        var firebaseAuth = new FirebaseAuth(authActions);
    };

    if (options.useRealtimeDatabase) {
        var firebaseDatabase = new FirebaseDatabase(firebaseApp, payloadFactoryMethods.requestPayloadFactory, payloadFactoryMethods.responsePayloadFactory);
    };

    if (options.useFirestore) {
        var firestoreDatabase = new FirestoreDatabase(payloadFactoryMethods.requestPayloadFactory, payloadFactoryMethods.responsePayloadFactory);
    };

    return {
        firebaseApp,
        firebaseAuth,
        firestoreDatabase,
        firebaseDatabase
    };
}