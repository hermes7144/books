import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback: Function) {
  onAuthStateChanged(auth, async (user) => {
    setUserInfo(user);
    let updatedUser = user ? await getNeighborhood(user) : null;

    callback(updatedUser);
  });
}

export async function getBooks() {
  const booksRef = collection(db, 'books');

  return await getDocs(query(booksRef, orderBy('createdDate', 'desc')));
}
export async function addNewBook(book: any) {
  const id = uuid();
  return await setDoc(doc(db, 'books', id), {
    ...book,
    id,
    price: parseInt(book.price),
    createdDate: new Date().toISOString(), // 현재 시간을 ISO 문자열로 저장
  });
}

export async function getUser(uid) {
  return await getDoc(doc(db, 'users', uid));
}

export async function setUserInfo(user: any) {
  try {
    const res = await getUser(user.uid);

    if (!res.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
      await setDoc(doc(db, 'userChats', user.uid), {});
    }
  } catch (err) {
    console.log(err);
  }
}

export async function writeNeighborhood(user, neighborhood: string) {
  return setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    neighborhood,
  });
}

export async function getNeighborhood(user: any) {
  return (await getDoc(doc(db, 'users', user.uid))).data();
}

export async function getChats(chatId) {
  return await getDoc(doc(db, 'chats', chatId));
}
