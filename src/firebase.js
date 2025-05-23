import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDVosBVfJn61yDt4AoF6zanPtsxZ9S02Ss",
  authDomain: "netflix-clone-b12c5.firebaseapp.com",
  projectId: "netflix-clone-b12c5",
  storageBucket: "netflix-clone-b12c5.firebasestorage.app",
  messagingSenderId: "222357453818",
  appId: "1:222357453818:web:da2125962082e8fd5b8243"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db , "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth)
}
export {auth, db, login, signup, logout}