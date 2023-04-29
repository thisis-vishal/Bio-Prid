import {React, useState, createRef} from 'react'
import {useNavigate} from "react-router-dom"

const SignUpForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [passMatch, setPassMatch] = useState(true);

  // navigation
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    console.log({
      name: name,
      email: email,
      password: pass,
      confPass: confPass
    });

    if(pass === confPass) {
      setPassMatch(true);
      const response = await fetch("http://localhost:8000/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass        
        })
      });

      const content = await response.json();
      console.log(content);

      navigate("/signin");
    }
    else {
      setPassMatch(false);
      return;
    }
  }

  return (
    <form onSubmit={submit}>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Name</label>
        <input type="text" placeholder='Enter your username' className='w-full border rounded-md bg-transparent border-gray-400 p-3' 
        onChange={e => setName(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Email</label>
        <input type="email" placeholder='Enter your email' className='w-full border rounded-md bg-transparent border-gray-400 p-3' 
        onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Password</label>
        <input type="password" placeholder='Enter your password' className='w-full border rounded-md bg-transparent border-gray-400 p-3' 
        onChange={e => setPass(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Confirm Password</label>
        <input type="password" placeholder='Re-enter password' className='w-full border rounded-md bg-transparent border-gray-400 p-3' 
        onChange={e => setConfPass(e.target.value)}/>
        {!passMatch && <p className='text-red-400'>Passwords do not match</p>}
      </div>

      <button className='block bg-blue-700 text-white w-full py-2 px-8 rounded' type='submit'>Sign Up</button>

      <div className="grid grid-cols-3 h-full">
        <div className="col-span-3 flex justify-center items-center place-items-center">
          <div className="min-w-[450] px-8">
            <div className="mb-8 mt-4">
            <a href="/signin" ><span className='hover:text-blue-700'>Already have an account?</span></a>
            </div>
          </div>
        </div>
      </div>

    </form>
  )
}

export default SignUpForm
