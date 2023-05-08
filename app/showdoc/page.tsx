"use client"
import Image from "next/image";
import Link from "next/link";
import Review from "@/components/Testimonials"

import {useRouter} from "next/navigation"
const AboutPage = () => {
    const router=useRouter();
    const handleAllR=()=>{
        router.push("/doc-allreview")
    }
    return (
    
            <section className="py-16 md:py-20 lg:py-28">

                <div className="container  bg-blur-lg   ">

                    <div className="-mx-4 flex flex-wrap rounded-md">
                        <div className="w-full px-4 lg:w-1/3">

                            <div className="wow fadeInUp relative mx-auto mb-12  max-w-[500px] text-center lg:m-0 flex justify-center">

                                <Image src="/images/doctor/Docpro.jpg" alt="Doctor-profile-IMG" width={150} height={150} className="rounded-full mb-8 items-top mt-4" />

                            </div>
                            <div className="mt-12  rounded-md bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0 flex justify-center font-sans font-bold">
                                <h1>Dr. Ramesh Parkash</h1>
                            </div>



                            <div className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0  ">

                            </div>


                            <div className="flex items-start my-8 flex-col ml-8">
                                <h2 className="font-bold  w-full text-green tracking-wide">Description</h2>
                                <p className="text-white font-sans">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos nam harum perspiciatis, neque aliquid assumenda! Impedit maxime adipisci voluptatum, maiores sunt, odit tempore omnis accusantium officia et distinctio. Corrupti consequatur laboriosam at veritatis ut sint, amet nobis quos cupiditate, officia omnis ipsam temporibus minima sapiente quis mollitia debitis iure non! Pariatur, odio dolor libero corrupti consectetur nemo ut cumque eaque.</p>

                            </div>

                        </div>


                        <div className="w-full px-4 lg:w-2/3 mt-12 mb-10 rounded-md  p-6 lg:mt-0 ">
                            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">

                                <div className="mb-9 ml-8">
                                    <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl ">
                                        Your Profile
                                    </h3>
                                    <hr />

                                    <div className="grid grid-cols-3 gap-6 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Full Name  </p>
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Ramesh Verma </p>
                                    </div>

                                    <hr />

                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Email </p>
                                        <p className="mt-4 col-span-2 font-bold  text-white dark:text-white "> rameshverma7877@gmail.com </p>
                                    </div>
                                    <hr />

                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Specialization</p>
                                        <p className="mt-4 font-bold  text-white dark:text-white "> Brain Expert </p>
                                    </div>
                                    <hr />

                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Experience</p>
                                        <p className="mt-4 font-bold  text-white dark:text-white "> 3 Years  </p>
                                    </div>
                                    <hr />


                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Mobile Number</p>
                                        <p className="mt-4 font-bold  text-white dark:text-white "> 9914342566 </p>
                                    </div>
                                    <hr />

                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Date Of Joining</p>
                                        <p className="mt-4 font-bold  text-white dark:text-white "> 30-Dec-2022 </p>
                                    </div>
                                    <hr />

                                    <div className="grid grid-cols-3 gap-5 my-4">
                                        <p className="mt-4 font-bold  text-white dark:text-white ">Appointment Fee</p>
                                        <p className="mt-4 font-bold  text-white dark:text-white "> RS. 200  </p>
                                    </div>
                                    <hr />



                                    <button className=" w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mt-4">
                            Make Appointment
                        </button>
                                </div>
                            </div>
                        </div>




                    </div>
                    <Review />
                    <div className="flex justify-end  pb-8">
                        
                        <button className="w-1/6 justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mr-8">
                           Add Review
                        </button>
                        <button  onClick={handleAllR} className=" w-1/6 justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block">
                            All Review
                        </button>

                    </div>








                </div>
            </section >
        
    );
};

export default AboutPage;
