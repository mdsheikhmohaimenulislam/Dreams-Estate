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
import axios from "axios";

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

  //!that section use case
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // github login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  //   Google sign in
  const googleHandle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  logout
  const logOutHandle = () => {
    setLoading(true);
    return signOut(auth);
  };

  // currently signed-in user
  //   useEffect(() => {
  //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //       setLoading(false);
  //     });
  //     return () => {
  //       unSubscribe();
  //     };
  //   }, []);

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email);
      setUser(currentUser);
      if (currentUser) {

        //  Get JWT token from backend and save to localStorage
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser.email },
          { withCredentials: true }
        );


        const token = res.data.token;
        // console.log(res.data);
        if (token) {
          localStorage.setItem("access-token", token);
          // console.log("JWT token saved:", token);
        }
      } else {
        setUser(null);
        //  Logout from server and clean token
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        });

        localStorage.removeItem("access-token");
        console.log("JWT token removed");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    setLoading,
    updateUserProfile,
    signInHandle,
    loginHandle,
    logOutHandle,
    setUser,
    githubLogin,
    googleHandle,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default ContextProvider;
