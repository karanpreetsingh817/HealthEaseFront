'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Cookie from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AboutPage = () => {

    let Token = Cookie.get("Jwt")
    const [user, setUser] = useState({
        name:null,
        description:null,
        email:null,
        age:null,
        qualification:null,
        specialization:null,
        dateOfCreation:null,
        experience:null,
        appointmentFee:null,
        profileImg:{
            public_id:"",
            url:""

        }
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const getInfo = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}doctor/123`, {
                headers: {
                    "authorization": `Bearer ${Token}`,
                    "Content-Type": "application/json"
                }
            });
            setUser(res.data.result);
            setName(res.data.result.name)
            setEmail(res.data.result.email)
            console.log(res.data.result);
        }
        catch (err) {
            toast.error('🦄 Error While Fetching Your Data', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              router.back()
        }
    }

    useEffect(() => {
        getInfo();

    },[])

    const handleSubmit = async (el) => {
        try {
            el.preventDefault();
            console.log(email,name)

            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}doctor/123`, {email,name}, {
                headers: {
                    "authorization": `Bearer ${Token}`,
                    "Content-Type": "application/json"
                },
                withCredentials:true
            });
            toast.success('🦄 Profile Updated Succesfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            router.push("/doc-profile")
        }
        catch (err) {
            toast.error('🦄 Failed To Update Profile', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              router.back()
        }

    }


    return (
        <>  

        <section className="py-16 md:py-20 lg:py-28">

            <div className="container  bg-dark  bg-opacity-80 backdrop-blur-md dark:bg-opacity-100 p-12 ">

                <div className="-mx-4 flex flex-wrap  ">
                    <div className="w-full px-4 lg:w-1/3">

                        <div className="wow fadeInUp relative mx-auto mb-12  max-w-[500px] text-center lg:m-0 flex justify-center">

                            <Image src={user.profileImg.url} alt="Doctor-profile-IMG" width={150} height={150} className="rounded-full mb-8 items-top mt-4" />

                        </div>
                        <div className="mt-12  rounded-md bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0 flex justify-center font-sans font-bold text-dark">
                            <h1 className="text-white">{user.name}</h1>
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
                                    Only update Email and Name
                                </h3>
                                <hr />


                                <div className="grid grid-cols-3 gap-6 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Full Name  </p>
                                    <input

                                        value={name}
                                        onChange={(el) => { setName(el.target.value) }}
                                        type="text"
                                        name="text"
                                        placeholder={user.name}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />

                                </div>

                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Email </p>
                                    <input
                                        value={email}
                                        onChange={(el) => { setEmail(el.target.value) }}

                                        type="email"
                                        name="email"
                                        placeholder={user.email}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />
                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Age</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.age} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Qualification</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.qualification} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Specialization</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.specialization} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Experience</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white ">  {user.experience}  </p>
                                </div>
                                <hr />




                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Date Of Joining</p>
                                    <p className="mt-4 font-bold  text-whhite dark:text-white "> {user.dateOfCreation} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Appointment Fee</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {user.appointmentFee} </p>
                                </div>
                                <hr />

                                <div className="mt-8 flex  ">
                                <Link
                                        href="/doc-profile"
                                        className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center mr-4 ">
                                        Back
                                    </Link>
                                    <button
                                        onClick={handleSubmit}
                                        className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-full text-center ">
                                        Done
                                    </button>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
        <ToastContainer/>
        </>

    );
};

export default AboutPage;
