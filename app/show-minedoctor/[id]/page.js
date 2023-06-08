"use client"
import Image from "next/image";
import ReviewCard from "@/components/ReviewCard/index"
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie"
import { usePathname ,useRouter} from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Doctor = () => {
    const router=useRouter()
    const x = usePathname()
    const [doctor, setDoctor] = useState({});

    const [id, setId] = useState("")
  const [review ,setReview]=useState([])
    useEffect(() => {
        const fetchData = async () => {
            try{

            

            let y = x.split("/")
            setId(y[2])
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}patient/doctor/${id}`, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                }
            });
            setDoctor(data.result);
            Cookie.set("doctorId",id)
            setReview(data.review)
            console.log(data.review)
        }
        catch(err){
            toast.error('🦄 Cant Fetch Details Of Doctor At This Moment', {
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
        fetchData();
    }, [id]);

    return (
<>

        <section className="py-16 md:py-20 lg:py-28">

            <div className="container  bg-blur-lg   ">

                <div className="-mx-4 flex flex-wrap rounded-md">
                    <div className="w-full px-4 lg:w-1/3">

                        <div className="wow fadeInUp relative mx-auto mb-12  max-w-[500px] text-center lg:m-0 flex justify-center">

                            <Image src="/images/doctor/Docpro.jpg" alt="Doctor-profile-IMG" width={150} height={150} className="rounded-full mb-8 items-top mt-4" />

                        </div>
                        <div className="mt-12  rounded-md bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0 flex justify-center font-sans font-bold">
                            <h1>{doctor.name} </h1>
                        </div>



                        <div className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0  ">

                        </div>


                        <div className="flex items-start my-8 flex-col ml-8">
                            <h2 className="font-bold  w-full text-green tracking-wide">Description</h2>
                            <p className="text-white font-sans">{doctor.description}</p>

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
                                    <p className="mt-4 font-bold  text-white dark:text-white ">{doctor.name}</p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Qualification</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {doctor.qualification} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Email </p>
                                    <p className="mt-4 col-span-2 font-bold  text-white dark:text-white "> {doctor.email} </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Specialization</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {doctor.specialization}</p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Experience</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> {doctor.experience}  </p>
                                </div>
                                <hr />




                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Date Of Joining</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white ">30-12 </p>
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Appointment Fee</p>
                                    <p className="mt-4 font-bold  text-white dark:text-white "> $ {doctor.appointmentFee}  </p>
                                </div>
                                <hr />



                                <button className=" w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mt-4" onClick={()=>{router.push("/book-appointment")}}>
                                    Make Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                    
                




                </div>
<div>
{ review &&(

    <ReviewCard title={"What Our Patient Think About Doctor"} Reviews={review} />
)
}
{ !review &&(
   
   <div className="h-1/2 w-full z-10">Thereis no review</div>
)
}</div>
                
                
                <div className="flex justify-end  pb-8">

                    <button className="w-1/6 justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mr-8"
                    onClick={()=>{router.push("/doc-addreview")}}>
                        Add Review
                    </button>
                    <button onClick={()=>{router.push("/doc-allreview")}} className=" w-1/6 justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block">
                        All Review
                    </button>

                </div>








            </div>
        </section >
        <ToastContainer/>
        </>

    );
};



export default Doctor;
