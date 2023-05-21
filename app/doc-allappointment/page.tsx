'use client'
import { useState, useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import Cookie from "js-cookie"



const Page = () => {
    const router=useRouter();
    const [data, setData] = useState([]);
    // Fetch data from the API and set the state
    useEffect(() => {
        const fetchData = async () => {
            // const p1=Cookie.get("model")
            const res = await axios.get(`http://localhost:8080/v1/appointment/allAppointmentOfMine`, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setData(res.data.result);

        };
        fetchData();
        
      

    }, []);

    // Categorize the data based on status 'done', 'cancled', 'upcoming'
    const upcomingAappointment = data.filter((appointment) => appointment.status === 'upcoming');
    const doneAppointment = data.filter((appointment) => appointment.status === 'done');
    const cancledAppointment = data.filter((appointment) => appointment.status === 'cancled');


    const handleDone=async(id)=>{
        window.location.reload();
        try {
       
        const res = await axios.patch("http://localhost:8080/v1/appointment/makeAppointmentDone", {  id
        
      },
      {headers: {
        "authorization": `Bearer ${Cookie.get("Jwt")}`,
        "Content-Type": "application/json"
      }
    });
        const user=res.data.result;
        console.log(user)


      }
  
      catch (err) {
        alert(err.response.data.message);
  
        // send custom Error according to Status code or something like that
        // if(err.response.status===400 ){
        //   alert("invalid Credentials")
        // }
      }
      
    
  
  
    }

    
    const handleCancle=async(id)=>{
        window.location.reload();
        try {
       
            const res = await axios.patch("http://localhost:8080/v1/appointment/cancleAppointment", {  id
            
          },
          {headers: {
            "authorization": `Bearer ${Cookie.get("Jwt")}`,
            "Content-Type": "application/json"
          }
        });
            const user=res.data.result;
            console.log(user)
            router.push("/doc-allappointment")
    
    
          }
      
          catch (err) {
            alert(err.response.data.message);
      
            // send custom Error according to Status code or something like that
            // if(err.response.status===400 ){
            //   alert("invalid Credentials")
            // }
          }
          
        
    }

    return (
        <section className="relative z-10 overflow-hidden pt-16 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28  ">
            <h1 className="text-green font-bold text-4xl flex justify-center mb-8">Here List Of Appointments Of Yours</h1>
            <div className="py-8 flex flex-row justify-center">

                <div>
                    <table className="w-full bg-primary bg-opacity-20 pb-16  py-4 ">
                        <thead>
                            <tr className="bg-white bg-opacity-20 ]">
                                <th className="px-16 py-8">Doctor Name</th>
                                <th className="px-16 py-8">Patient Name</th>
                                <th className="px-16 py-8">Date</th>
                                <th className="px-16 py-8">Time Slot</th>
                                <th className="px-16 py-8">Mobile Number</th>
                                <th className="px-16 py-8">Status</th>
                            </tr>
                        </thead>
                        {/* <h1 >Upcoming Appointments</h1> */}

                        <tbody>
                            <tr>
                                <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4 "> Upcoming Appointments</td>
                            </tr>
                            {upcomingAappointment.map((appointment) => (
                                <tr key={appointment._id} >
                                    <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                    <td className="px-16 py-8">{appointment.patientId.name}</td>
                                    <td className="px-16 py-8">{appointment.timing}</td>
                                    <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                    <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                    <td className="px-16 py-8 text-yellow"><button className="bg-green text-dark p-2 m-2" onClick={()=>{handleDone(appointment._id)}}>Done</button>
                                    <button className="bg-yellow text-dark p-2" onClick={()=>{handleCancle(appointment._id)}}>Cancle</button>
                                    </td>
                                </tr>
                            ))}
                             {upcomingAappointment.length === 0 && (
                                <tr >
                                    <td className="px-16 py-8 col-span-6 text-center">There Is No Upcoming Appointments</td>

                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* <h1>Already Done Appointments</h1> */}
                    <table className="w-full bg-yellow bg-opacity-20 pb-16  py-4 " >
                        <tbody>
                            <tr>
                            <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Already Done</td>
                            </tr>
                            {doneAppointment.map((appointment) => (
                                <tr key={appointment._id} >
                                    <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                    <td className="px-16 py-8">{appointment.patientId.name}</td>
                                    <td className="px-16 py-8">{appointment.timing}</td>
                                    <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                    <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                    <td className="px-16 py-8 text-primary">{appointment.status}</td>
                                </tr>
                            ))}
                            {doneAppointment.length === 0 && (
                                <tr >
                                    <td className="px-16 py-8 col-span-6 text-center">There Is No Yet Done Appointments</td>

                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* <h1>Cancled Appointment</h1> */}
                    <table className="w-full bg-white bg-opacity-20 pb-16  py-4 ">

                        <tbody>
                            <tr>
                                <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Cancled Appointment</td>
                            </tr>
                            {cancledAppointment.map((appointment) => (
                                <tr key={appointment._id} >
                                    <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                    <td className="px-16 py-8">{appointment.patientId.name}</td>
                                    <td className="px-16 py-8">{appointment.timing}</td>
                                    <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                    <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                    <td className="px-16 py-8">{appointment.status}</td>
                                </tr>
                            ))}
                            {cancledAppointment.length === 0 && (
                                <tr >
                                    <td className="px-16 py-8 col-span-6 text-center">There Is No Yet Cancled Appointments</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );

}

export default Page;
