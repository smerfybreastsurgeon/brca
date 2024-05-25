import React, { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase'; // Assuming this imports the auth object correctly

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Clean up subscription
        return unsubscribe;
    }, []);

    if (loading) {
        return <p>Loading......</p>;
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
