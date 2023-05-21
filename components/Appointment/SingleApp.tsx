import { table } from "console";


const SinglePage = () => {
    return (
        <section className="relative z-10 overflow-hidden pt-16 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28  ">
            <h1 className="text-green font-bold text-4xl flex justify-center mb-4">Here List Of Appointments Of Yours</h1>
            <div className="py-4 flex flex-row justify-center">
                <table >
                    <tr className=" bg-white bg-opacity-20 w-full" >
                        <th className="px-16 py-2">Doctor Name</th>
                        <th className="px-16 py-2">Patient Name</th>
                        <th className="px-16 py-2">Date</th>
                        <th className="px-16 py-2">Time Slot</th>
                        <th className="px-16 py-2">Status</th>
                        <th className="px-16 py-2">Mobile Number</th>
                    </tr>
                    
                    <tr className=" bg-white bg-opacity-10 w-full">
                        <td className="px-16 py-2">Doctor Name</td>
                        <td className="px-16 py-2">Patient Name</td>
                        <td className="px-16 py-2">Date</td>
                        <td className="px-16 py-2">Time Slot</td>
                        <td className="px-16 py-2">Status</td>
                        <td className="px-16 py-2">Mobile Number</td>
                    </tr>
                       
                </table>
            </div>
        </section>



    )
}

export default SinglePage;