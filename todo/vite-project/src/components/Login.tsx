import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from '../supabase';

const Login = ({setToken }:any) => {
  let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  console.log(formData)

  function handleChange(event:any) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }))
  }

  async function handleSubmit(e:any) {
  e.preventDefault();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) throw error;
    console.log(data);
    setToken(data);
    navigate('/homepage');
  } catch (error) {
    alert(error);
  }
}


  return (
    <>
    <div className='flex justify-center pt-16'>
        <form className='h-10/12 w-4/12 bg-slate-400 shadow-2xl shadow-slate-300  text-center p-10 rounded-3xl' >
            <h1 className='text-black font-serif text-3xl py-4'>
                Sign In
            </h1>
            <div className='flex flex-col gap-5 py-12 items-start pl-10'>
                <div>
                    <label className='text-lg pl-4'>Email : </label>
                    <input className='rounded-2xl  p-1 ml-4 text-center' type="email" placeholder='Enter your email' name='email' onChange={handleChange}  required />
                </div>
                <div>
                    <label className='text-lg'>Password : </label>
                    <input className='rounded-2xl  p-1 text-center' type="password" placeholder='Enter your password' name='password' required onChange={handleChange} />
                </div>
            </div>
            <button className='bg-slate-50  border bg-transparent  shadow-sm   px-5 py-1 mb-5 rounded-2xl' type='button' onClick={handleSubmit}>Sign In</button>
            
            <p>Don't have an account <b>
                    <Link to="/SignUp" className='text-white italic underline font-sans'>
                        Sign-Up
                    </Link></b>
                </p> 
        </form>
    </div>
    </>
  )
}

export default Login