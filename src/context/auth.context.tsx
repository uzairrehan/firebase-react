"use client";

import Signin from "@/app/Signin/page";
import Signup from "@/app/Signup/page";
import { app } from "@/firebase/firbaseconfig";
import { AuthContextType, AuthContextProviderType, UserType } from "@/types/types";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";



const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<UserType | null>(null);

    const route = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                const { email, uid } = loggedInUser;
                setUser({ email, uid });
                if (loggedInUser.emailVerified) {
                    route.push("/Profile");
                } else {
                    route.push("/Verify");
                    if (auth.currentUser) {
                        sendEmailVerification(auth.currentUser);
                    }
                }
            } else {
                console.log('inside onauthstatechange else statement');
                setUser(null);
                route.push("/");
            }
        });
    }, [route,Signin,Signup]);
    

    return (
        <AuthContext.Provider value={{ user }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);