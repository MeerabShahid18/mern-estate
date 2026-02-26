import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth, provider);
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL 
                    ? result.user.photoURL 
                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}),
            })
            const data=await res.json();
             dispatch(signInSuccess(data));
            navigate("/"); 

        }catch(error){
            console.log("could not sign in with google", error);
        }

    }
  return (
    <button  onClick={handleGoogleClick} type='button' className='bg-red-700 p-3 rounded-lg text-white hover:opacity-80 uppercase'>Continue with google</button>
  )
}

