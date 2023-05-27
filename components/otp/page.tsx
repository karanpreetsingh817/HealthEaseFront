'use client'
import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { ToastContainer, toast } from 'react-toastify'
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";


const MyComponent = ({fullName, age, address, bloodGroup, mobile, email, password, confirmPassword, image}) => {
 const router=useRouter()
  const [otp, setOtp] = React.useState('')
  

  const handleChange = (newValue) => {
    setOtp(newValue)
  }


  const handleVerify=async(el)=>{
    el.preventDefault();
     try {
    console.log(otp)
      const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}patient/signup`, { name: fullName, email, age, address, bloodGroup, mobile, password, confirmPassword, image ,OTP:otp}, {
        headers: {
            authorization: `Bearer ${Cookie.get("Jwt")}`,
            "Content-Type": "application/json",
        },
        withCredentials: true 
    });
      toast("SignUp Successfully")
      console.log(result.data.status);
      Cookie.set("userName", result.data.result.name);
      router.push("/signin")
    }
    catch (err) {

      toast.error(`🦄 Invalid Otp`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28 ">
    <div className="container">
    <MuiOtpInput value={otp} onChange={handleChange} className='ml-36'/>
    <div className='flex justify-end mr-64 mt-16'>
        <button className='py-4 px-8 bg-green text-dark mr-4 rounded-md hover:bg-opacity-80 hover:shadow-signUp' onClick={handleVerify}>Verify</button>
    </div>
    </div>
    <ToastContainer/>
    </section>
  )
}

export default MyComponent;
