# Refine-Firebase

> Firebase integration tool for your Refine app

## Install

```bash
npm i refine-firebase
```

## Usage

**1. Create a config file and initialize firebase.**

_firebaseConfig.js_

```js
import { initializeFirebase } from "refine-firebase";

export const firebaseConfig = {
    apiKey: XXXXX,
    authDomain: XXXXX,
    projectId: XXXXX,
    storageBucket: XXXXX,
    messagingSenderId: XXXXX,
    appId: XXXXX,
    databaseURL: XXXXX,
};

export const firebaseApp = initializeFirebase(firebaseConfig);
```

**2. Create tools according to your needs.**

_firebaseConfig.js_

```js
import {
    FirebaseAuth,
    FirebaseDatabase,
    FirestoreDatabase,
} from "refine-firebase";

export const firebaseAuth = new FirebaseAuth();

export const firestoreDatabase = new FirestoreDatabase();

export const firebaseDatabase = new FirebaseDatabase();
```

**3. Use dataProviders for Refine**

_App.js_

```js
import {firebaseAuth, firestoreDatabase }from "./firebaseConfig";

 <Refine
      dataProvider={firestoreDatabase.getDataProvider()}
      authProvider={firebaseAuth.getAuthProvider()}
    >
```

## API Reference

### **Functions**

| Function           | Description                                     |
| ------------------ | ----------------------------------------------- |
| initializeFirebase | Creates and initializes a FirebaseApp instance. |

### **Classes**

| Class             | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| FirebaseAuth      | Provider for generating [firebase-authentication] and [IAuthContext] for @pankod/refine auth-provider                           |
| FirestoreDatabase | Provider for initializing [Firestore] instance with the provided FirebaseApp and creating @pankod/refine [dataProvider]         |
| FirebaseDatabase  | Provider for initializing [Realtime-Database] instance with the provided FirebaseApp and creating @pankod/refine [dataProvider] |

<!-- ### **initializeFirebase**

Creates and initializes a FirebaseApp instance.

Add Firebase to your app and Initialize multiple projects for detailed documentation.

| Parameter | Type              | Description                                                                                 |
| --------- | ----------------- | ------------------------------------------------------------------------------------------- |
| options   | [FirebaseOptions] | Options to configure the app's services                                                     |
| name      | string            | Optional name of the app to initialize. If no name is provided, the default is "[DEFAULT]". |

Returns:

[FirebaseApp]

The initialized app.

### **FirestoreDatabase**

Creates and initializes a Firestore instance.

Add Firestore to your app .

| Parameter | Type           | Description                             |
| --------- | -------------- | --------------------------------------- |
| options   | IPropsDatabase | Options to configure the app's services |

Returns:

[FirebaseApp]

The initialized app. -->

## License

[MIT](http://vjpr.mit-license.org)

[firebaseoptions]: https://firebase.google.com/docs/reference/js/app.firebaseoptions.md?authuser=0#firebaseoptions_interface
[firebaseapp]: https://firebase.google.com/docs/reference/js/app.firebaseapp.md?authuser=0#firebaseapp_interface
[iauthcontext]: https://refine.dev/docs/api-references/providers/auth-provider/#api-reference
[firebase-authentication]: https://firebase.google.com/docs/reference/js/auth.md?authuser=0#functions
[dataprovider]: https://refine.dev/docs/api-references/providers/data-provider
[firestore]: https://firebase.google.com/docs/reference/js/firestore_.md?authuser=0#@firebase/firestore
[realtime-database]: https://firebase.google.com/docs/reference/js/database.md?authuser=0#database_package
