"use client";

import { getAuth, sendEmailVerification } from "firebase/auth";
import app from "next/app";
const auth = getAuth();

function Verify() {
    return ( <>
        Verify Your Account . check email
        <button onClick={()=>{
            sendEmailVerification(auth.currentUser)
        }}>Resend</button>
    </> );
}

export default Verify;