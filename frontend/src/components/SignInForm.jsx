import {React, useState, SyntheticEvent} from 'react'
import styles from '../style'
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [auth, setAuth] = useState(false);
  const [detail, setDetail] = useState("");

  // navigate
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    
    console.log({
      email: email,
      password: pass
    })
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: pass        
      })
    });

    const content = await response.json();
    console.log(content);
    if(content.detail === "User Found") {
      navigate("/");
    }
    else {
      setDetail(content.detail);
      return;
    }
  }
  return (
    <form onSubmit={submit}>
      <p className='text-red-400'>{detail}</p>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Email</label>
        <input type="text" placeholder='Enter your email' className='w-full border rounded-md bg-transparent border-gray-400 p-2' required 
        onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label className='font-medium font-poppins mb-2 flex'>Password</label>
        <input type="password" placeholder='Enter your password' className='w-full border rounded-md bg-transparent border-gray-400 p-3' required
        onChange={e => setPass(e.target.value)}/>
      </div>
      <div className='flex justify-between mb-6'>
        <a href="#SignIn" ><span className='hover:text-blue-700'>Forget Password?</span></a>
      </div>

      <button className='block bg-blue-700 text-white w-full py-2 px-8 rounded' type='submit'>Sign In</button>

      <div className="grid grid-cols-3 h-full">
        <div className="col-span-3 flex justify-center items-center place-items-center">
          <div className="min-w-[450] px-8">
            <div className="mb-8 mt-4">
            <a href="/signup" ><span className='hover:text-blue-700'>Create an account</span></a>
            </div>
          </div>
        </div>
      </div>

    </form>
  )
}

export default SignInForm
