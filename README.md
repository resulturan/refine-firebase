#Refine-Firebase

> Firebase integration tool for your Refine app

[![NPM Version][npm-image]][npm-url]


## Install

```bash
npm i refine-firebase
```

## Usage

Create a config file and initialize firebase.

firebaseConfig.js

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

Create tools according to your needs.

firebaseConfig.js

```js
import {
    FirebaseAuth,
    FirebaseDatabase,
    FirestoreDatabase,
} from "refine-firebase";

export const firebaseAuth = new FirebaseAuth();

export const firestoreDatabase = new FirestoreDatabase();

export const firebaseDatabase = new FirebaseDatabase(firebaseApp);
```
## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/refine-firebase
