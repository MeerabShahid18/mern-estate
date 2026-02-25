import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setformData]=useState({});
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(false);
  const Navigate=useNavigate();
  const handleChange=(e)=>{
   setformData({
    ...formData,
    [e.target.id]: e.target.value,
   });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      setError(null);
      const res=await fetch("/api/auth/signup", {
        method:'POST',
        headers: {"Content-Type" : 'application/json'},
        body: JSON.stringify(formData)
      });
      console.log(res);
      const data=await res.json();
      console.log(data);
      if (!res.ok) {
      setLoading(false);
      setError(data.message || "Something went wrong");
      return;
    }
      if (data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      Navigate("/sign-in")
      
    }catch(error){
       setLoading(false);
       setError('Something went wrong');
    }
  } ;
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' className='p-3 border rounded-lg ' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' className='p-3 border rounded-lg ' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='p-3 border rounded-lg ' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 ' type='submit'>{loading?"Loading...":"Sign Up"}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-3'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
        {error && <p className='text-red-700 my-3 text-center font-semibold text-2xl'>{'Something went wrong'}</p>}
    </div>
  )
}
