import React, { createContext } from 'react'

import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import config from '../config/firebase'

const FirebaseContext = createContext()

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore();

const Firebase = {

    getCurrentUser: () => {
        return firebase.auth().currentUser
    },
    createUser: async (user) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            const uid = Firebase.getCurrentUser().uid
            let profilePhotoUrl = "default";
            await db.collection("users").doc(uid).set({
                username: user.username,
                email: user.email,
                profilePhotoUrl
            })
            if (user.profilePhoto) {
                profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
            }
            delete user.password
            return { ...user, profilePhotoUrl, uid }
        } catch (error) {
            console.log("Error @CreateUser", error.message);
        }

    },
    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;
        try {
            const photo = await Firebase.getBlob(uri)
            const imageRef = firebase.storage().ref("profilePhotos").child('IMG_' + Math.random(4000))
            await imageRef.put(photo)
            const url = await imageRef.getDownloadURL();
            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url,
            });
            console.log(url)
            return url;
        } catch (error) {
            console.log("Error @UploadProfilePhoto: ", error.message);
        }
    },

    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response)
            }
            xhr.onerror = () => {
                reject(new TypeError("Network require failed."))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)
            xhr.send(null)
        })
    },

    getUserInfo: async (uid) => {
        try {
            const user = await db.collection("users").doc(uid).get()

            if (user.exists) {
                return user.data()
            }

        } catch (error) {
            console.log("Error @GetUserInfo: ", error)
        }
    },

    logOut: async () => {
        try {
            await firebase.auth().signOut();

            return true;
        } catch (error) {
            console.log("Error @logOut: ", error);
        }

        return false;
    },

    signIn: async (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },


    updateProfile: async (user) => {
        const uid = Firebase.getCurrentUser().uid;
        await db.collection("users").doc(uid).update({
            username: user.username,
            // profilePhotoUrl: user.profilePhotoUrl,
        }).finally(
            console.log(user)
        )
        // return { ...user, profilePhotoUrl, uid }
    }
};

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>
        {props.children}
    </FirebaseContext.Provider>
}

export { FirebaseContext, FirebaseProvider }