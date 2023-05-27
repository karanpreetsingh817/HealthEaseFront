'use client'
import SectionTitle from "@/components/Common/SectionTitle";
import SingleBlog from "@/components/PatientCard/SingleBlog"
import {useState, useEffect } from 'react';
import {useRouter} from "next/navigation"
import axios from "axios";
import Cookie from "js-cookie"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const AllDoctor = () => {

    const router=useRouter();
    const [patients,setPatients]=useState([]);
    const callAboutpage=async()=>{
       
        try{
            
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointment/minePatient`,{
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                  },                
            } );
            setPatients(res.data.result)
            console.log(res.data.result)
        }
        catch(err)
        {
          toast.error('🦄 There Is Error While Fetching Patients Data from Server', {
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


  useEffect(() => {
    callAboutpage();
  },[])

  const handleBack=()=>{
    router.back();
  }


  return (
        <>
        {
       patients ? (
        <section id="blog" className="bg-white/5 bg-opacity-90 py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Here List Of All Patients "
            paragraph=""
            center
          />
  
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {patients.map((patient) => {
             if(patient!==null) return (
              <div key={patient._id} className="w-full">
                <SingleBlog patient={patient} />
              </div>
            )
          }
)}
         
          </div>
        </div>
        <button className="p-4 ml-40 bg-green text-dark px-12 rounded-md hover:bg-opacity-50 mt-16  " onClick={handleBack}> Back</button>
      </section>
            
        ): (
            <h2>no patient data</h2>
        )
        }
        <ToastContainer/>
        </>
    )
}

export default AllDoctor;