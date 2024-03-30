/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState, createContext, useEffect } from 'react';
import {
  GoogleAuthProvider,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, 
} from "firebase/auth";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext<any>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = async (): Promise<void> => {
    setLoading(true);
    await signOut(auth);
  };
  const signIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser && currentUser.email) {
          setUser(currentUser);
        } 
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error.message);
        setLoading(false);
      }
    );
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    signIn,
    logOut,
    createUser,
    googleSignIn,
    user,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
