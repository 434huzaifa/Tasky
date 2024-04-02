/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState, createContext, useEffect } from "react";
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
import useAxios from "../Hook/useAxios";
export const AuthContext = createContext<any>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const caxios = useAxios();
 
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
  const assignJWT = (email: string | null) => {
    setLoading(true);
    return caxios.post("/jsonwebtoken", { email });
  };
  const logoutJWT = () => {
    setLoading(true);
    return caxios.post("/logout");
  };
  const changeLoading = async (value: boolean) => {
    await setLoading(value);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        if (currentUser && currentUser.email) {
          caxios
            .get(`/user?mail=${currentUser.email}`)
            .then(() => {
              assignJWT(currentUser.email)
                .then(() => {
                  changeLoading(false);
                })
                .catch(async (err: any) => {
                  await logOut();
                  changeLoading(false);
                  console.log("assignJWT~", err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          logoutJWT()
            .then()
            .catch((err) => {
              console.log("logoutJWT~", err);
            });
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
    loading,
    setUser,
    changeLoading,
    assignJWT,
    logoutJWT,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
