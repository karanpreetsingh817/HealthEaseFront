'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookie from "js-cookie";
import Link from "next/link"



const IndexPage = () => {
  const router = useRouter();
  const [totalPatient, setTotalpatient] = useState('');
  const [search,setSearch]=useState("")


  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get("http://localhost:8080/v1/doctor/afterLogin", {
          headers: {
            "authorization": `Bearer ${Cookie.get("Jwt")}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        const result = res.data.result;
        console.log(res.data.result)


      }
      catch (err) {
        console.log(err.response)
        // router.push('/')
      }
    }

    fetchData();
  }, [])


  const handleSearch = async (el) => {
    el.preventDefault();
    try {
        const res = await axios.get("http://localhost:8080/v1/doctor/getPatientByName", {
            headers: {
                "authorization": `Bearer ${Cookie.get("Jwt")}`,
                "Content-Type": "application/json"
            },
            params:{
                name:search
            },
            withCredentials:true
        });

        const patient=res.data.result[0];
        console.log(res.data.result)
        router.push(`/doc-allpatient/${patient._id}`)
    

    }
    catch (err) {
        console.log(err.response)
        // router.push('/')
    }

}
  return (
    <section className="pt-[100px] pb-[120px]">
      <div className="container">
       
        <div className="flex flex-col items-center ">
          <div className="flex justify-between w-11/12 mb-4 h-36">
          <Link  href="/admin-totalpatient"  className="w-1/2 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70 hover:text-dark" >
              <h3 className="text-lg font-semibold pl-4">Total Patients</h3>
              <p className=" ">{totalPatient}</p>
            </Link>

            <Link  href="/admin-totaldoctor"  className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#ba7ba1] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70  hover:text-dark" >
              <h3 className="text-lg font-semibold pl-4">Total Doctors</h3>
              <p className="text-gray-800">{}</p>
            </Link>


           
           

          </div>


        </div>
        <div className="flex flex-col items-center  ">
          <div className="flex justify-between w-11/12 mb-4 h-36 ">

          <Link  href="/admin-totalappointment"  className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#a9afd1] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-100  hover:text-dark" >
              <h3 className="text-lg font-semibold pl-4">Total Appointments</h3>
              <p >{}</p>
            </Link>

          <Link  href="/doc-signup"  className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#ff8811] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70  hover:text-dark" >
              <h3 className="text-lg font-semibold pl-4">Add New Doctor</h3>

            </Link>
           

          </div>
        </div>

       
      </div>

    </section>
  );
};

export default IndexPage;
