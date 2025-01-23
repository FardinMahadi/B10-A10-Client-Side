import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import LoadingPage from "../pages/LoadingPage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Default to true to show the loader initially

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      setUser({
        displayName: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        accCreated: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      const response = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          accCreated: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to the database.");
      }

      return googleUser;
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const createNewUser = async (email, password) => {
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email, password) => {
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const timer = setTimeout(() => {
        if (currentUser) {
          // Map the user object for your application needs
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    isDarkMode,
    setIsDarkMode,
    user,
    setUser,
    validatePassword,
    loading,
    setLoading,
    handleGoogleSignIn,
    createNewUser,
    logIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
