"use client";

import { app } from "@/firebase/firbaseconfig";
import { getAuth, sendEmailVerification } from "firebase/auth";
const auth = getAuth(app);

function Verify() {
    return ( <>
        Check email Verify it and reload
        <br />
        click  here to resend
        <br />
        <button onClick={()=>{
            if (auth.currentUser){
            sendEmailVerification(auth.currentUser)}
        }}>Resend</button>
    </> );
}

export default Verify;