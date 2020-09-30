import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCmJC3WNo96shwkGKXWrQk8QWjP4ccjHFE",
    authDomain: "sunflower-c4d5b.firebaseapp.com",
    databaseURL: "https://sunflower-c4d5b.firebaseio.com",
    projectId: "sunflower-c4d5b",
    storageBucket: "sunflower-c4d5b.appspot.com",
    messagingSenderId: "340711866509",
    appId: "1:340711866509:web:4ec03e7309ce51e96ee2c4",
    measurementId: "G-14YMGJ2BRJ"
});

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}