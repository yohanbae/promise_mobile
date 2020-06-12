// import Rebase from 're-base';
import * as firebase from "firebase";
// import 'firebase/firestore';
import '@firebase/firestore';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, APP_ID } from 'react-native-dotenv'

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: "914604649889",
    appId: APP_ID,
    measurementId: "G-H09VWD76TE"
}

// firebase.initializeApp(config);

if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }


export default firebase;
// export {base};