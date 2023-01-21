const { FirebaseAuth } = require("../lib/firebaseAuth");
const { getAuth, connectAuthEmulator, } = require("@firebase/auth");
const { initializeApp } = require("@firebase/app");
const { getFirestore, connectFirestoreEmulator } = require("firebase/firestore");
const { FirestoreDatabase } = require("../lib/FirestoreDatabase");

const emulator_uri = "http://localhost:9099";
const projectId = "fakeproject";
const apiKey = "fakeApiKey";

const userInfo = {
    email: "test@gmail.com",
    password: "123456",
};

const app = initializeApp({ projectId, apiKey });

const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, emulator_uri);
connectFirestoreEmulator(db, "localhost", 8080);


const firebaseAuth = new FirebaseAuth(undefined, undefined, auth);
const firestoreDatabase = new FirestoreDatabase({ firebaseApp: app }, db);

(async function Test() {
    // await register();

    await login();
    console.log("Logged in successfully");

    await createData();

    auth.currentUser.delete();
})();



async function register() {
    await firebaseAuth.handleRegister(userInfo);
}

async function login() {
    await firebaseAuth.handleLogIn(userInfo);
}

async function createData() {
    try {
        const data = await firestoreDatabase.createData({
            resource: "TEST",
            variables: {
                name: "test",
                age: 20,
                id: "test"
            }
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register, login };

