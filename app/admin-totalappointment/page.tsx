'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import Cookie from "js-cookie"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    // Fetch data from the API and set the state
    useEffect(() => {
        const fetchData = async () => {
            // const p1=Cookie.get("model")
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointment`, {
                    headers: {
                        "authorization": `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                setData(res.data.result);
            }
            catch (err) {
                toast.error('🦄 There is No Appointments', {
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
        };
        fetchData();
    },[]);
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
    return (
        <>
            <section className="relative z-10 overflow-hidden pt-16 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28  ">
                <h1 className="text-green font-bold text-4xl flex justify-center mb-8">Here List Of Appointments Of Yours</h1>
                <div className="py-8 flex flex-row justify-center">
                    <div>
                        <table className="w-full bg-primary bg-opacity-20 pb-16  py-4 ">
                            <thead>
                                <tr className="bg-white bg-opacity-20 ">
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
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Upcoming Appointments</td>
                                </tr>
                                {upcomingAappointment.length >= 0  && upcomingAappointment.map((appointment) => (
                                    <tr key={appointment._id} >
                                        <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                        <td className="px-16 py-8">{appointment.patientId.name}</td>
                                        <td className="px-16 py-8">{appointment.timing}</td>
                                        <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                        <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                        <td className="px-16 py-8 text-primary">{appointment.status}</td>
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
                                {doneAppointment.length >= 0 && doneAppointment.map((appointment) => (
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
                                {cancledAppointment.length >= 0 && cancledAppointment.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Yet Cancled Appointments</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Page;
