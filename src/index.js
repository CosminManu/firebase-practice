import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'


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
  const auth = getAuth()    //initialize auth service - sign in, log in, log out

  //get the reference to the collection in the db
  const collectionRef = collection(db, 'books')

  const q = query(collectionRef, orderBy('createdAt'))

  // get real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push( {...doc.data(), id: doc.id})
    })
    console.log(books)
})

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(collectionRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
    })
})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const deleteDocRef = doc(db, "books", deleteBookForm.id.value)
    deleteDoc(deleteDocRef)
        .then(() => {
            deleteBookForm.reset()
        })
})


// get a single document from collection
const documentRef = doc(db, 'books', '448GAsnEUXUxqw1RgXaz')

//get a single document
getDoc(documentRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

//real time changes
onSnapshot(documentRef, (doc) => {
    console.log(doc.data(), doc.id)
})


//update a document from collection
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const updateDocRef = doc(db, "books", updateBookForm.id.value)
    updateDoc(updateDocRef, {
        title : 'new book title'
    })
    .then(() => {
        updateBookForm.reset()
    })
})

//Sign Up Form
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            console.log('user created: ', credential.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// Logout
const logoutBtn = document.querySelector('.logout')
logoutBtn.addEventListener('click', (e) => {
    signOut(auth)
        .then(() => {
            console.log('User signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

//Login
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            console.log('user logged in: ', credential.user)
        })        
        .catch((err) => {
            console.log(err.message)
        })
})