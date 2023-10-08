import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

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
export const fireStore = getFirestore(app);

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
  onAuthStateChanged(auth, (user) => {
    callback(user);
    setUserInfo(user);
  });
}

export async function getUserInfo(uid) {
  const res = await getDoc(doc(fireStore, 'users', uid));
  return res;
}

export async function setUserInfo(user: any) {
  try {
    const res = await getDoc(doc(fireStore, 'users', user.uid));

    if (!res.exists()) {
      await setDoc(doc(fireStore, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
      await setDoc(doc(fireStore, 'userChats', user.uid), {});
    }
  } catch (err) {
    console.log(err);
  }
}

export async function setNeighborhood2(user, neighborhood: string) {
  return setDoc(doc(fireStore, 'users', user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    neighborhood,
  });
}
