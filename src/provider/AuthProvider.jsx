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
  const [games, setGames] = useState(
    () => JSON.parse(localStorage.getItem("games")) || []
  );
  const [categories, setCategories] = useState(
    () => JSON.parse(localStorage.getItem("categories")) || []
  );
  const [watchlist, setWatchList] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Combined fetching for games and categories
  useEffect(() => {
    if (games.length === 0) {
      fetch("games.json")
        .then((res) => res.json())
        .then((data) => {
          setGames(data);
          localStorage.setItem("games", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching games:", error));
    }

    if (categories.length === 0) {
      fetch("categories.json")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          localStorage.setItem("categories", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [games.length, categories.length]);

  // Update theme in localStorage
  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Fetch user data from backend
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user?.email]);

  // Store watchlist in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

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

  // Function to handle watchlist updates
  const toggleWatchList = (gameId) => {
    setWatchList((prevWatchList) => {
      let updatedWatchList;
      if (prevWatchList.includes(gameId)) {
        // Remove from watchlist
        updatedWatchList = prevWatchList.filter((id) => id !== gameId);
      } else {
        // Add to watchlist
        updatedWatchList = [...prevWatchList, gameId];
      }

      // Update localStorage
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
      return updatedWatchList;
    });
  };

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
    watchlist,
    setWatchList,
    toggleWatchList, // Updated function reference
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
