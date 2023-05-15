'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import Cookie from "js-cookie"



const Page = () => {
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

    return (
        <section className="relative z-10 overflow-hidden pt-16 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28  ">
            <h1 className="text-green font-bold text-4xl flex justify-center mb-8">Here List Of Appointments Of Yours</h1>
            <div className="py-8 flex flex-row justify-center">

                <div>
                    <table className="w-full bg-white bg-opacity-20 pb-16  py-4 text-left">
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
                            {upcomingAappointment.map((appointment) => (
                                <tr key={appointment._id} >
                                    <td className="px-16 py-8">{appointment.doctorId.name}</td>
                                    <td className="px-16 py-8">{appointment.patientId.name}</td>
                                    <td className="px-16 py-8">{appointment.timing}</td>
                                    <td className="px-16 py-8">{`${appointment.startHour} : ${appointment.startMinute === 0 ? '00' : appointment.startMinute}`}</td>
                                    <td className="px-16 py-8">{appointment.patientId.phoneNumber}</td>
                                    <td className="px-16 py-8 text-yellow">{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <h1>Already Done Appointments</h1> */}
                    <table className="w-full bg-white bg-opacity-20 pb-16  py-4 text-center " >
                        <tbody>
                            <tr>
                                <td className="col-span-6 text-primary pl-8 text-xl font-bold"> Already Done</td>
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
                        </tbody>
                    </table>

                    {/* <h1>Cancled Appointment</h1> */}
                    <table className="w-full bg-white bg-opacity-20 pb-16  py-4 ">

                        <tbody>
                            <tr>
                                <td className="col-span-6 text-primary pl-8  text-xl font-bold"> Cancled Appointment</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );

}

export default Page;
