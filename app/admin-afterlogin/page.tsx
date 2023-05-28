'use client'
import { useState, useEffect } from 'react';
import axios from "axios";
import Cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IndexPage = () => {
  const router = useRouter();
  const [totalPatient, setTotalpatient] = useState([]);
  const [totalDoctor, setTotalDoctor] = useState([]);
  const [totalAppointment, setTotalAppointment] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}doctor/afterLogin`, {
        headers: {
          "authorization": `Bearer ${Cookie.get("Jwt")}`,
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      const result = res.data.result;
      setTotalpatient(result.patients)
      setTotalDoctor(result.doctors)
      setTotalAppointment(result.appointments)
    }
    catch (err) {
      toast.error('🦄 There is a Problem Plz Try Again Later', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      router.push('/')
    }
  }
  useEffect(() => {
    fetchData();
  },[])

  return (
    <>
      <section className="pt-[100px] pb-[120px]">
        <div className="container">
          <div className="flex flex-col items-center ">
            <div className="flex justify-between w-11/12 mb-4 h-36 ">
              <Link href="/admin-totalpatient" className="w-1/2 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70 hover:text-dark " >
                <h3 className="text-lg font-semibold pl-4">Total Patients</h3>
                <p className="text-gray-800 ml-4">{totalPatient.length}</p>
              </Link>
              <Link href="/admin-totaldoctor" className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#ba7ba1] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70  hover:text-dark" >
                <h3 className="text-lg font-semibold pl-4">Total Doctors</h3>
                <p className="text-gray-800 ml-4">{totalDoctor.length}</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center  ">
            <div className="flex justify-between w-11/12 mb-4 h-36 ">
              <Link href="/admin-totalappointment" className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#a9afd1] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-100  hover:text-dark" >
                <h3 className="text-lg font-semibold pl-4">Total Appointments</h3>
                <p className="text-gray-800 ml-4">{totalAppointment.length}</p>
              </Link>
              <Link href="/doc-signup" className="w-1/2 p-4 bg-gray-200 rounded-lg bg-[#ff8811] bg-opacity-20 mx-2 pt-12 hover:bg-opacity-70  hover:text-dark" >
                <h3 className="text-lg font-semibold pl-4">Add New Doctor</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default IndexPage;
