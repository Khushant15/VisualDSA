import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const FirebaseAuthContext = createContext(null);

export const useAuth = () => useContext(FirebaseAuthContext);

// Keep old name exported so existing consumers don't break immediately
export const useGoogleAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  const value = {
    user,
    loading,
    signOut,
    // Provide user display helpers
    displayName: user?.displayName || user?.email?.split("@")[0] || null,
    photoURL: user?.photoURL || null,
    email: user?.email || null,
    isLoggedIn: !!user,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
};

// Legacy alias so App.jsx doesn't need two edits
export const GoogleAuthProvider = FirebaseAuthProvider;
