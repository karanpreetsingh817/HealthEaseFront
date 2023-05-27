'use client'
import Image from "next/image";
import Link from "next/link";
import {useState,useEffect} from 'react'
import {useRouter} from "next/navigation"
import Cookie from "js-cookie";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AboutPage = () => {
  const router=useRouter();
  let Token
  const [photo,setPhoto]=useState("")
  const [user, setUser]=useState({
    name:null,
    email:null,
    specialization:null,
    experience:null,
    description:null,
    phoneNumber:null,
    appointmentFee:null,
    profileImg:null,
    dateOfCreation:null
  });
  const getInfo=async()=>{
       Token=Cookie.get("Jwt")
      try{
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}doctor/doc`,{
              headers: {
                  "authorization": `Bearer ${Cookie.get("Jwt")}`,
                  "Content-Type": "application/json"
                }
          } );
          setUser(res.data.result);
          setPhoto(res.data.result.profileImg.url)
      }
      catch(err)
      {
        toast.error('🦄 There Is Error While recieving Doctor Detail', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.back();
      }
  }

useEffect(() => {
  getInfo();

},[])

  return (
    <>
  
      <section className="py-16 md:py-20 lg:py-28">

        <div className="container  bg-dark  bg-opacity-80 backdrop-blur-md dark:bg-opacity-100 p-12 ">

          <div className="-mx-4 flex flex-wrap  ">
            <div className="w-full px-4 lg:w-1/3">

              <div className="wow fadeInUp relative mx-auto mb-12  max-w-[500px] text-center lg:m-0 flex justify-center">

                <Image src={photo} alt="Doctor-profile-IMG" width={150} height={150} className="rounded-full mb-8 items-top mt-4" />

              </div>
              <div className="mt-12  rounded-md bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0 flex justify-center font-sans font-bold text-dark">
                <h1 className="text-white">{user.name}</h1>
              </div>



              <div className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0  ">
                <Link
                  href="/create-slots"
                  className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full ">
                  Create Slots
                </Link>
              </div>
              

              <div className="flex items-start my-8 flex-col ml-8">
                <h2 className="font-bold  w-full text-green ">Description</h2>
               <p className="text-white">{user.description}</p>
                 
                </div> 

            </div>


            <div className="w-full px-4 lg:w-2/3 mt-12 mb-10 rounded-md  p-6 lg:mt-0 ">
              <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">

                <div className="mb-9 ml-8">
                  <h3 className="mb-4 text-xl font-bold text-white  sm:text-2xl lg:text-xl xl:text-2xl ">
                    Your Profile
                  </h3>
                  <hr />

                  <div className="grid grid-cols-3 gap-6 my-4">
                    <p className="mt-4 font-bold  text-white  ">Full Name  </p>
                    <p className="mt-4 font-bold  text-white  ">{user.name} </p>
                  </div>

                  <hr />

                  <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Email </p>
                    <p className="mt-4 col-span-2 font-bold  text-white dark:text-white ">{user.email}</p>
                  </div>
                  <hr />

                  <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Specialization</p>
                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.specialization} </p>
                  </div>
                  <hr />

                  <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Experience</p>
                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.experience} </p>
                  </div>
                  <hr />

                  
                  {/* <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Mobile Number</p>
                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.phoneNumber} </p>
                  </div>
                  <hr /> */}

                  <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Date Of Joining</p>
                    <p className="mt-4 font-bold  text-whhite dark:text-white "> {user.dateOfCreation}</p>
                  </div>
                  <hr />

                  <div className="grid grid-cols-3 gap-5 my-4">
                    <p className="mt-4 font-bold  text-white dark:text-white ">Appointment Fee</p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">$ {user.appointmentFee} </p>
                  </div>
                  <hr />
                
                <div className="mt-8">
                  <Link
                  href="/doc-updateprofile"
                  className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center">
                  Update Profile
                </Link>
                </div>
                </div>
              </div>
            </div>

          </div>
          <div className="grid grid-cols-3 gap-6 my-4">
          <Link
                  href="/doc-allpatient"
                  className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center ">
                  All My Patients
                </Link>
                <Link
                  href="/doc-allappointment"
                  className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center ">
                  All Appointments
                </Link>
                <Link
                  href="/doc-updatepass"
                  className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center">
                 Chnage Password
                </Link>
                  </div>
        </div>
      </section >
      <ToastContainer/>
      </>
 
  );
};

export default AboutPage;
