import { app } from '@/firebase/firbaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup} from "firebase/auth";


// const provider = new GoogleAuthProvider();


const auth = getAuth(app);



export function signupWithEmailPassword(email: string, password: string) {
    console.log(email, password, 'inside func')
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const { email, uid } = userCredential.user;
            console.log(email, uid, 'user created successfully.', userCredential);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            // ..
        });
}


export function loginWithEmailPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const { email, uid } = userCredential.user;

            console.log(email, uid, 'user LOGGED IN successfully.', userCredential);

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);

        });
}



// export function googleSign(auth,provider) {
//     signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     console.log(credential, token ,user);
    
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(errorCode,errorMessage, email, credential);
    
//     // ...
//   });
// }