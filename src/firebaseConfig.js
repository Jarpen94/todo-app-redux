import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDdLyk_iSI7aOXNJiR9XbPqdJ3cT2dE1ec",
    authDomain: "todo-list-742cd.firebaseapp.com",
    databaseURL: "https://todo-list-742cd.firebaseio.com",
    projectId: "todo-list-742cd",
    storageBucket: "todo-list-742cd.appspot.com",
    messagingSenderId: "15628511653"
  };
  firebase.initializeApp(config);

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()