import { createContext, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
      });

      console.log("Google Sign-In successful:", googleUser);
      return googleUser;
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    isDarkMode,
    setIsDarkMode,
    user,
    setUser,
    loading,
    setLoading,
    handleGoogleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
