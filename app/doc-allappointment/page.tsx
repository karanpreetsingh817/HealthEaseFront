'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Page = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    // Fetch data from the API and set the state
    useEffect(() => {
        const fetchData = async () => {
            // const p1=Cookie.get("model")
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointment/allAppointmentOfMine`, {
                    headers: {
                        "authorization": `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                setData(res.data.result);
            }
            catch (err) {
                toast.error('🦄 There Is Error While Fetching Appointments from Server', {
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

        };
        fetchData();


    }, []);
    let upcomingAappointment=[];
    let doneAppointment=[];
    let cancledAppointment=[];
    // Categorize the data based on status 'done', 'cancled', 'upcoming'
  if(data.length!==0){
    upcomingAappointment = data.filter(
        (appointment) => appointment.status === "upcoming"
    );
    doneAppointment = data.filter(
        (appointment) => appointment.status === "done"
    );
    cancledAppointment = data.filter(
        (appointment) => appointment.status === "cancled"
    );

  }


    const handleDone = async (id) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}appointment/makeAppointmentDone`,
                {
                    id
                },
                {
                    headers: {
                        "authorization": `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json"
                    }
                });
            if (res) {
                toast.success('🦄 Appointment Successfully Done', {
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
            window.location.reload();

        }

        catch (err) {
            toast.error('🦄 Error While Change Status Of Appointment', {
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


    const handleCancle = async (id) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}appointment/cancleAppointment`, {
                id
            },
                {
                    headers: {
                        "authorization": `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json"
                    }
                });
            toast.success('🦄 Appointment Successfully Canclled', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            window.location.reload();

        }
        catch (err) {
            toast.error('🦄 Appointment Not Cenclled At This Time', {
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

    const handleBack = () => {
        router.back();
    }

    return (
        <>
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

                            <tbody>
                                <tr>
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4 "> Upcoming Appointments</td>
                                </tr>
                                {upcomingAappointment.length >= 0 && upcomingAappointment.map((appointment) => 
                                {
                                    return( appointment!==null &&
                                   ( <tr key={appointment._id} >
                                        <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                        <td className="px-16 py-8">{appointment.patientId.name}</td>
                                        <td className="px-16 py-8">{appointment.timing}</td>
                                        <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                        <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                        <td className="px-16 py-8 text-yellow"><button className="bg-green text-dark p-2 m-2" onClick={() => { handleDone(appointment._id) }}>Done</button>
                                            <button className="bg-yellow text-dark p-2" onClick={() => { handleCancle(appointment._id) }}>Cancle</button>
                                        </td>
                                    </tr>)
                                    )
                            
                                }
                                )}
                                {upcomingAappointment.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Upcoming Appointments</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table className="w-full bg-yellow bg-opacity-20 pb-16  py-4 " >
                            <tbody>
                                <tr>
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Already Done</td>
                                </tr>
                                {doneAppointment.length >= 0 && doneAppointment.map((appointment) => {
                                    return( appointment!==null && (
                                    <tr key={appointment._id} >
                                        <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                        <td className="px-16 py-8">{appointment.patientId.name}</td>
                                        <td className="px-16 py-8">{appointment.timing}</td>
                                        <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                        <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                        <td className="px-16 py-8 text-primary">{appointment.status}</td>
                                    </tr>)
                                    )
                                }
                                )}
                                {doneAppointment.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Yet Done Appointments</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table className="w-full bg-white bg-opacity-20 pb-16  py-4 ">

                            <tbody>
                                <tr>
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Cancled Appointment</td>
                                </tr>
                                {cancledAppointment.length >= 0 && cancledAppointment.map((appointment) => {
                                    return (
                                    appointment !== null  &&
                                        (
                                            <tr key={appointment._id} >
                                                <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                                <td className="px-16 py-8">{appointment.patientId.name}</td>
                                                <td className="px-16 py-8">{appointment.timing}</td>
                                                <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                                <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                                <td className="px-16 py-8">{appointment.status}</td>
                                            </tr>
                                        )
                                       )})
                            
                            }


                                {cancledAppointment.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Yet Cancled Appointments</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <button className="p-4 ml-32 bg-green text-dark px-12 rounded-md hover:bg-opacity-50 " onClick={handleBack}> Back</button>
            </section>
            <ToastContainer />
        </>
    );

}

export default Page;
