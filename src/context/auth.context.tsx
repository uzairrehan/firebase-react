"use client";

import { app } from "@/firebase/firbaseconfig";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type UserType = {
    email: string | null,
    uid: string
}

type AuthContextProviderType = {
    children: ReactNode
}

type AuthContextType = {
    user: UserType | null
}

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
                    route.push("/Verify")
                    sendEmailVerification(auth.currentUser)
                }
            }
            else {
                console.log('inside onauthstatechange else statement');
                setUser(null);
                route.push("/");
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ user }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);