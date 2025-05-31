import React, { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, auth } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";

const ADMIN_UIDS = [
  "Dz1UtNSZcRdE1GAHKhotC7Li4Al2",
  "Ha55NDmzPRTjeSrx3vTd0pcsh9a2",
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && ADMIN_UIDS.includes(currentUser.uid)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    const MIN_LOGOUT_DURATION = 2000;
    const startTime = Date.now();

    try {
      await signOut(auth);
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOGOUT_DURATION - elapsedTime;
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({
      user,
      loading,
      isAdmin,
      isLoggingOut,
      loginWithGoogle,
      logout,
    }),
    [user, loading, isAdmin, loginWithGoogle, logout, isLoggingOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
