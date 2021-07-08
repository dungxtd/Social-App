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
            let profilePhotoUrl = "default", followers = 0, following = 0, posts = 0;
            await db.collection("users").doc(uid).set({
                username: user.username,
                email: user.email,
                name: "",
                bio: "",
                posts,
                followers,
                following,
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
    createPost: async (post) => {
        try {
            const uid = Firebase.getCurrentUser().uid
            await db.collection("posts").add({
                likes: null,
                comments: null,
                content: post.content,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
                userId: uid,
                postPhotoUrl: post.postPhotoUrl !== null ? await Firebase.uploadPostPhoto(post.postPhotoUrl) : null
            })
        } catch (error) {
            console.log("Error @createPost", error.message);
        }

    },
    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;
        try {
            const photo = await Firebase.getBlob(uri)
            const imageRef = await firebase.storage().ref("profilePhotos").child('IMG_' + Math.random(4000))
            await imageRef.put(photo)
            const url = await imageRef.getDownloadURL();
            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url,
            });
            //console.log(url)
            return url;
        } catch (error) {
            console.log("Error @UploadProfilePhoto: ", error.message);
        }
    },

    uploadPostPhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;
        try {
            const photo = await Firebase.getBlob(uri)
            const imageRef = await firebase.storage().ref("postPhotos").child('IMG_' + Math.random(4000))
            await imageRef.put(photo)
            const url = await imageRef.getDownloadURL();
            return url;
        } catch (error) {
            console.log("Error @UploadPostPhoto: ", error.message);
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
        try {
            await db.collection("users").doc(user.uid).update({
                username: user.username,
                email: user.email,
                name: user.name,
                bio: user.bio,
                //profilePhotoUrl: user.profilePhotoUrl
            })
        } catch (error) {
            console.log("Error @updateProfile", error.message);
        }
    },

    getAllPosts: async () => {
        const allPosts = [];
        await db.collection("posts").where("userId", "!=", "")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    if ((doc.id, " => ", doc.data()) != null) allPosts.push({ ...doc.data(), postId: doc.id });
                });
                // console.log(allPosts);
                return allPosts;
            })
            .catch((error) => {
                console.log("@getAllPosts: ", error);
            });
    }
};

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>
        {props.children}
    </FirebaseContext.Provider>
}

export { FirebaseContext, FirebaseProvider }