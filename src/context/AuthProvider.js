import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';

export const AuthContext = createContext();

export const GetContexts = () => {
    return  useContext(AuthContext);
    
}


const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const auth = firebase.auth();
    const [refetch, setRefetch] = useState(false);
    let [isAdmin, setIsAdmin] = useState(false);
    const refetcher = () => {
        setRefetch(!refetch);
        alert(userData?.email ||"notFound");
    }
    useEffect(() => {
        const unSubs = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserData(user);
                setLoading(false);
                fetch(`https://specta-web.herokuapp.com/isAdmin?email=${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setIsAdmin(true);
                        }
                        else {
                            setIsAdmin(false);
                        }
                    });
            } else {
                setUserData({});
                setLoading(false);
            }
        })
        return unSubs;
        
    }, [refetch]);

    const value = {
        user:userData,
        isAdmin,
        setIsAdmin,
        loading,
        setLoading,
        refetcher,
        setUserData,
    }


    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;