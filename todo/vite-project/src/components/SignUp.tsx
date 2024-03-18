import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const SignUp = () => {

  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
  })

  console.log(formData)

  function handleChange(event:any){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e:any){
    e.preventDefault()

    try {
      const {error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

      
    } catch (error) {
      alert(error)
    }
    
  }




  return (
    <div className='flex justify-center pt-16  '>
            <form className='h-10/12 w-4/12 bg-slate-400 shadow-2xl shadow-slate-300  text-center p-10 rounded-3xl' onSubmit={handleSubmit}>
                <h1 className='text-black font-serif text-3xl py-4'>
                    Sign Up
                </h1>
                <div className='flex flex-col gap-5 py-9 items-start pl-10'>
                    <div>
                        <label className=' text-lg pl-4'> Name : </label>
                        <input className='rounded-2xl  p-1 ml-3 text-center' type="text" placeholder='Enter your name' name='fullName' required onChange={handleChange} />
                    </div>
                    <div>
                        <label className=' text-lg pl-4'> Email : </label>
                        <input className='rounded-2xl p-1 ml-4 text-center' type="email" placeholder='Enter your email' name='email' required onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-lg'>Password : </label>
                        <input className='rounded-2xl p-1 text-center' type="password" placeholder='Enter your password' name='password' required onChange={handleChange} />
                    </div>
                </div>
                <button className='bg-slate-50 border bg-transparent  shadow-sm  px-5 py-1 mb-5 rounded-2xl' >Sign Up</button>
                <p>Already have an account <b>
                <Link to='/' className='text-white italic underline font-sans'>
                        Sign-In</Link></b>
                </p>
            </form>
        </div>
  )
}

export default SignUp