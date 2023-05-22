'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookie from "js-cookie";
import Link from "next/link"



const IndexPage = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [totalPatient, setTotalpatient] = useState('');
  const [totalCollection, setTotalCollection] = useState('');
  const [todayCollection, setTodayCollection] = useState('');
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
        setAppointments(result.appointments);
        setTotalpatient(result.totalPatient);
        setTotalCollection(result.totalCollection);
        setTodayCollection(result.todayCollection);
        console.log(res.data.result)
      }
      catch (err) {
        console.log(err.response)
        // router.push('/')
      }
    }
    fetchData();
  }, [Cookie.get("Jwt")])

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

  const upcomingAappointment = appointments.filter((appointment) => appointment.status === 'upcoming');
  const doneAppointment = appointments.filter((appointment) => appointment.status === 'done');
  const cancledAppointment = appointments.filter((appointment) => appointment.status === 'cancled');

  return (
    <section className="pt-[100px] pb-[120px]">
      <div className="container">
        <form className="flex items-center justify-center w-full mb-10  ">
          <input
            value={search}
            onChange={(el)=>{setSearch(el.target.value)}}
            type="text"
            placeholder="Search Patient Here.........."
            className="palceholder-body-color mr-5 w-full rounded-md border border-transparent py-3 px-5 text-base font-medium dark:text-body-color outline-none focus:border-primary bg-white backdrop-blur-md bg-opacity-90 dark:bg-fs text-black dark:bg-opacity-10"
          />
          <button className="flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-md bg-primary text-white"
          onClick={handleSearch}
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.4062 16.8125L13.9375 12.375C14.9375 11.0625 15.5 9.46875 15.5 7.78125C15.5 5.75 14.7188 3.875 13.2812 2.4375C10.3438 -0.5 5.5625 -0.5 2.59375 2.4375C1.1875 3.84375 0.40625 5.75 0.40625 7.75C0.40625 9.78125 1.1875 11.6562 2.625 13.0937C4.09375 14.5625 6.03125 15.3125 7.96875 15.3125C9.875 15.3125 11.75 14.5938 13.2188 13.1875L18.75 17.6562C18.8438 17.75 18.9688 17.7812 19.0938 17.7812C19.25 17.7812 19.4062 17.7188 19.5312 17.5938C19.6875 17.3438 19.6562 17 19.4062 16.8125ZM3.375 12.3438C2.15625 11.125 1.5 9.5 1.5 7.75C1.5 6 2.15625 4.40625 3.40625 3.1875C4.65625 1.9375 6.3125 1.3125 7.96875 1.3125C9.625 1.3125 11.2812 1.9375 12.5312 3.1875C13.75 4.40625 14.4375 6.03125 14.4375 7.75C14.4375 9.46875 13.7188 11.125 12.5 12.3438C10 14.8438 5.90625 14.8438 3.375 12.3438Z"
                fill="white"
              />
            </svg>
          </button>
        </form>

        <div className="flex flex-col items-center ">
          <div className="flex justify-between w-11/12 mb-4 h-36">
          <Link  href="/doc-allpatient"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Total Number of Patients</h3>
              <p className=" ">{totalPatient}</p>
            </Link>
            <Link  href="/doc-allappointment"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Total Appointments</h3>
              <p >{appointments.length}</p>
            </Link>
            <Link  href="/"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Total Collection</h3>
              <p className="text-gray-800">$ {totalCollection}</p>
            </Link>
            <Link  href="/"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Today's Collection</h3>
              <p className="text-gray-800">$ {todayCollection}</p>
            </Link>

          </div>



          <div className="flex justify-between w-11/12 mb-4 h-36">
            <Link  href="/doc-allappointments"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
            
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-gray-800">700</p>
         
          </Link>
            
           
          <Link  href="/doc-allappointment"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Attend Appointments</h3>
              <p className="text-gray-800">{doneAppointment.length}</p>
            </Link>
            <Link  href="/"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">UpComing Appointments</h3>
              <p className="text-gray-800">{upcomingAappointment.length}</p>
            </Link>
            <Link  href="/doc-allappointment"  className="w-1/4 p-4 bg-gray-200 rounded-lg bg-primary bg-opacity-20 mx-2 pt-12 hover:bg-opacity-40" >
              <h3 className="text-lg font-semibold">Cancled Appointments</h3>
              <p className="text-gray-800">{cancledAppointment.length}</p>
            </Link>

          </div>





        </div>
        <div className='flex justify-end mr-[60px]'>


          <div className="wow fadeInUp relative mx-auto mb-12 max-w-full text-center lg:m-0 mt-16  flex  justify-end ">
            <button
            onClick={()=>{router.push("/doc-allpatient")}}
              className="ease-in-up rounded-md py-3 px-8 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-[500] ">
              Show All Patient
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default IndexPage;
