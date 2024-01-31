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
