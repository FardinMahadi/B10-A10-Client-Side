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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(null);
  const [categories, setCategories] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    fetch("games.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data); // Store the games in the state
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  useEffect(() => {
    fetch("categories.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // Store the games in the state
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user?.email]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      setUser({
        displayName: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photoURL,
        lastLogin: new Date().toISOString(),
      });

      const response = await fetch(
        `http://localhost:5000/users?email=${googleUser.email}`
      );
      const existingUser = await response.json();

      if (!existingUser) {
        await fetch(`http://localhost:5000/users`, {
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
      setUser(
        currentUser
          ? {
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            }
          : null
      );
      setLoading(false);
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
    games,
    setGames,
    categories,
    setCategories,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
