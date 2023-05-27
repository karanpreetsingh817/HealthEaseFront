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
            
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}patient`,{
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                  },                
            } );
            setPatients(res.data.result)
        }

        catch(err)

        {toast.error('🦄 Failed to get Your doctors', {
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
    callAboutpage();
},[])

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
            {patients.map((patient) => (
              <div key={patient._id} className="w-full">
                <SingleBlog patient={patient} />
              </div>
            ))}
          </div>
        </div>
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