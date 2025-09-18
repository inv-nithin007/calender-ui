import './Tail.css'  
import { useState } from 'react';
import { motion } from "framer-motion";


import { useNavigate } from 'react-router-dom';


export default function Tail() {

const [user,setUser]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const navigate=useNavigate();

const handlelogin=()=>{
  if(!user && !password){
    setError("Enter Username and Password")
    return
  }
if(!user){
  setError("Username is required");
  return
}

if(!password){
  setError("password  is required");
  return
}

if(!user && !password)
{
  setError("Username and Password are required")
  return;
}
  if(user=="admin" && password=="admin")
  {
    setError("");
    navigate('./home')
    return;
  }
  else{
    setError("Invalid Username or Password!");
    return;
  }
}
  return (
<div className='flex min-h-screen justify-center items-center bg-blue-100' >

  <motion.div
  initial={{opacity:0,y:40}}
  animate={{opacity:1,y:0}}
  transition={{duration:0.7}}
  
  className='w-full p-10 mb-10 max-w-lg bg-white rounded-4xl shadow-xl'>

    <h2
    className='mb-10 text-center text-5xl font-bold'
    >
        LOGIN
    </h2>


    <input
    value={user}
    
    required
    onChange={(e)=> setUser(e.target.value)}
    placeholder='enter your Username'
    className='p-3 w-full max-w-lg mt-1 mb-6 rounded-2xl border border-gray-400  focus:outline-none text-center text-1xl' 
    >

    </input>



  <input
  value={password}
  required
  onChange={(e)=> setPassword(e.target.value)}
  type='password'
  placeholder='enter password'
  className='border border-gray-400 w-full max-w-lg p-3 rounded-2xl text-center focus:outline-none text-1xl'
  
  >
      </input>

  <motion.button 
   whileHover={{scale:1.02}}
   whileTap={{scale:.97}}
   onClick={handlelogin}
  className='w-full max-w-lg mt-5 text-white font-semibold shadow-xl hover:shadow-xl bg-blue-400 hover:bg-blue-500 rounded-3xl p-3 '>
    Sign in 
  </motion.button>


 
    {error && (
  <motion.p
  key={error}
    initial={{ opacity: 0, x: -40}}   
    animate={{ opacity: 1, x: 0 }}     
    
    transition={{ duration: 0.4,ease: 'easeOut' }}
    className="mt-3 text-red-500 text-center font-semibold"
  >
    {error}
  </motion.p>
)}




  </motion.div>

 

</div>
  );
}
