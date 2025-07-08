import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../AuthContext/AuthContext";




const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in
  const signInHandle = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login section
  const loginHandle = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };



  //  Update's profile
  const updateProfileHandle = async ({ displayName, photoURL }) => {
    if (!auth.currentUser) {
      throw new Error("No user is signed in");
    }
  
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    } finally {
      setLoading(false);
    }
  };


// github login
const githubLogin = () => {
  setLoading(true);
  return signInWithPopup(auth,githubProvider)
}


//   Google sign in 
const googleHandle = () => {
    setLoading(true);
  return  signInWithPopup(auth,googleProvider);
}

  //  logout
  const logOutHandle = () => {
    setLoading(true);
    return signOut(auth);
  };

  // currently signed-in user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);



  const userInfo = {
    user,
    loading,
    setLoading,
    signInHandle,
    loginHandle,
    logOutHandle,
    setUser,
    githubLogin,
    updateProfileHandle,
    googleHandle,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default ContextProvider;