import { FirebaseOptions, initializeApp } from "@firebase/app";
import { FirebaseAuth } from "./firebaseAuth";
import { FirestoreDatabase } from "./firestoreDatabase";
import { FirebaseDatabase } from "./firebaseDatabase";
import { IRefineFirebase, IAuthCallbacks } from "./interfaces";

function initializeFirebase(
    firebaseConfig: FirebaseOptions,
    options: { useAuth: boolean, useRealtimeDatabase: boolean, useFirestore: boolean, },
    authActions: IAuthCallbacks,
    payloadFactoryMethods: {
        requestPayloadFactory: (resource: string, data: any) => any;
        responsePayloadFactory: (resource: string, data: any) => any;
    }
): IRefineFirebase {
    var firebaseApp = initializeApp(firebaseConfig);

    var result: IRefineFirebase = { firebaseApp };

    if (options.useAuth) {
        result.firebaseAuth = new FirebaseAuth(authActions);
    }

    if (options.useRealtimeDatabase) {
        result.firebaseDatabase = new FirebaseDatabase({
            firebaseApp,
            requestPayloadFactory: payloadFactoryMethods.requestPayloadFactory,
            responsePayloadFactory: payloadFactoryMethods.responsePayloadFactory
        });
    }

    if (options.useFirestore) {
        result.firestoreDatabase = new FirestoreDatabase({
            requestPayloadFactory: payloadFactoryMethods.requestPayloadFactory,
            responsePayloadFactory: payloadFactoryMethods.responsePayloadFactory
        });
    }

    return result;
}

export default initializeFirebase;
export * as types from "./interfaces";