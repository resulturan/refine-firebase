"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const app_1 = require("@firebase/app");
const firebaseAuth_1 = require("./firebaseAuth");
const firestoreDatabase_1 = require("./firestoreDatabase");
const firebaseDatabase_1 = require("./firebaseDatabase");
function initializeFirebase(firebaseConfig, options, authActions, payloadFactoryMethods) {
    var firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
    var result = { firebaseApp };
    if (options.useAuth) {
        result.firebaseAuth = new firebaseAuth_1.FirebaseAuth(authActions);
    }
    if (options.useRealtimeDatabase) {
        result.firebaseDatabase = new firebaseDatabase_1.FirebaseDatabase({
            firebaseApp,
            requestPayloadFactory: payloadFactoryMethods.requestPayloadFactory,
            responsePayloadFactory: payloadFactoryMethods.responsePayloadFactory
        });
    }
    if (options.useFirestore) {
        result.firestoreDatabase = new firestoreDatabase_1.FirestoreDatabase({
            requestPayloadFactory: payloadFactoryMethods.requestPayloadFactory,
            responsePayloadFactory: payloadFactoryMethods.responsePayloadFactory
        });
    }
    return result;
}
exports.default = initializeFirebase;
exports.types = require("./interfaces");
//# sourceMappingURL=index.js.map