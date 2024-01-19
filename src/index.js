import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, getDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDp36JQREcVq9qXA8Js3SziYWLOuSVEJX8",
    authDomain: "test-d2771.firebaseapp.com",
    projectId: "test-d2771",
    storageBucket: "test-d2771.appspot.com",
    messagingSenderId: "240580937483",
    appId: "1:240580937483:web:5f7543aa237eba8df3840e"
  };

  //init firebase app
  initializeApp(firebaseConfig)

  //init serv
  const db = getFirestore()

  //get the reference to the collection in the db
  const collectionRef = collection(db, 'books')


  // get collection data
 getDocs(collectionRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push( {...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err)
    })



