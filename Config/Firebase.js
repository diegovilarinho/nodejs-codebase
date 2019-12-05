import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class Firebase {
    constructor() {
        this._app = firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
        });
    }

    db() {
        return this._app.database();
    }
}

module.exports = Firebase;