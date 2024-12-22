import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create new user
    const createNewUser = (email, password, displayName, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).then(
            async (result) => {
                const newUser = result.user;
                // Update the user's profile
                await updateProfile(newUser, { displayName, photoURL });
                setUser({ ...newUser, displayName, photoURL }); // Update state manually
                setLoading(false);
            }
        );
    };

    // Login with email and password
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).then((result) => {
            setUser(result.user); // Update user state manually
            setLoading(false);
        });
    };

    // Login with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).then((result) => {
            setUser(result.user); // Update user state manually
            setLoading(false);
        });
    };

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth).then(() => {
            setUser(null); // Clear user state
            setLoading(false);
        });
    };

    // Monitor auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createNewUser,
        userLogin,
        signInWithGoogle,
        logOut,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
