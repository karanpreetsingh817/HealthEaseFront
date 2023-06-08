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
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}doctor/getTickets`, {
                    headers: {
                        "authorization": `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                console.log(res.data.result)
                await setData(res.data.result);
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
    }, []);

    let openTickets=[];
    let closeTickets=[];
    if(data.length!==0){
        openTickets = data.filter(
            (ticket) => ticket.status === "open"
        );
        closeTickets = data.filter(
            (ticket) => ticket.status === "close"
        );
    }
    return (
        <>
            <section className="relative z-10 overflow-hidden pt-16 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28  ">
                <h1 className="text-green font-bold text-4xl flex justify-center mb-8">All Tickets</h1>
                <div className="py-8 flex flex-row justify-center">

                    <div>
                        <table className="w-full bg-primary bg-opacity-20 pb-16  py-4 ">
                            <thead>
                                <tr className="bg-white bg-opacity-20 ">
                                    <th className="px-16 py-8">Ticket Number</th>
                                    <th className="px-16 py-8">Raised By</th>
                                    <th className="px-16 py-8">User Type</th>
                                    <th className="px-16 py-8">Raised At</th>
                                    <th className="px-16 py-8">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Open Tickets</td>
                                </tr>
                                { openTickets.length>=0 && openTickets.map((ticket) => (
                                    <tr key={ticket._id} >
                                        <td className="px-16 py-8">{ticket.ticketNumber}</td>
                                        <td className="px-16 py-8">{ticket.userName}</td>
                                        <td className="px-16 py-8">{ticket.role}</td>
                                        <td className="px-16 py-8">{ticket.genratedAt}</td>
                                        <td className="px-16 py-8 text-primary">{ticket.status}</td>
                                    </tr>
                                ))}
                                {openTickets.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Open issue At This Moment</td>

                                    </tr>
                                )}
                            </tbody>
                        </table>


                        <table className="w-full bg-yellow bg-opacity-20 pb-16  py-4 " >
                            <tbody>
                                <tr>
                                    <td className="col-span-6 text-primary pl-8  text-xl font-bold pt-4"> Closed Tickets</td>
                                </tr>
                                {closeTickets.length>=0 && closeTickets.map((ticket) => (
                                    <tr key={ticket._id} >
                                        <td className="px-16 py-8">{ticket.ticketNumber}</td>
                                        <td className="px-16 py-8">{ticket.userName}</td>
                                        <td className="px-16 py-8">{ticket.role}</td>
                                        <td className="px-16 py-8 text-primary">{ticket.status}</td>
                                        <td className="px-16 py-8">{ticket.genratedAt}</td>
                                    </tr>
                                ))}
                                {closeTickets.length === 0 && (
                                    <tr >
                                        <td className="px-16 py-8 col-span-6 text-center">There Is No Closed Issue</td>

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
