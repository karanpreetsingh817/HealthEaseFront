'use client'
import ReactCalendar from "react-calendar";
import { useState, useEffect } from "react"
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const Calendar = () => {
    const router=useRouter();
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [startHour, setStartHour] = useState("")
    const [startMinute, setStartMinute] = useState("")
    const [interval, setInterval] = useState("30")
    const [endHour, setEndHour] = useState("");
    const [isCreated, setIsCreated] = useState(false)
    // const [endMinute, setEndMinute] = useState("")


    const handleDate = async (date) => {
        setIsCreated(false)
        try {
            date.preventDefault;
            let timing;
           
                let day = date.getDate();
                let month = date.getMonth();
                let year = date.getFullYear();
                setDay(day);
                setMonth(month);
                setYear(year);
                timing = `${day}/${month}/${year}`
            
            const res = await axios.get(`http://localhost:8080/v1/appointment/isCreated`, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                },
                params: {
                    timing: timing
                }
            });

            if (res.data.result) {
                setIsCreated(true)
            }
        }
        catch (err) {
            alert(err)
        }
    }


    const handleSubmit = async (el) => {
        try {
            el.preventDefault()
            const res = await axios.post(`http://localhost:8080/v1/appointment/createSlots`, { startHour, endHour, day, month, year, startMinute, interval }, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.data) {
                confirm("Slots created Sucessfully")
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return <>
        <section id="contact" className="overflow-hidden py-20  md:py-20 lg:py-28 ">
            <div className="container ">
                <h1 className="text-primary font-bold  text-center  text-4xl">Select Date And Create Slots</h1>
                <div className="-mx-4 flex  justify-center">
                    <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
                        <div
                            className="wow fadeInUp mb-12 rounded-md  sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                            data-wow-delay=".15s
              "
                        >
                            <ReactCalendar
                                minDate={new Date()}
                                className='REACT-CALENDAR p-2 ' view="month" onClickDay={handleDate} />
                        </div>
                    </div>

                    <div>
                        <div>
                            {!isCreated && day && (
                                <div className="flex justify-center  mt-16  bg-dark bg-opacity-60 shadow-white ">

                                    <form>


                                        <div className="flex "></div>
                                        <div className="mb-8">
                                            <label
                                                htmlFor="startHour"
                                                className="mb-3 block text-sm font-medium text-white dark:text-white"
                                            >
                                                Start Hour
                                            </label>
                                            <input
                                                value={startHour}
                                                onChange={(el) => { setStartHour(el.target.value) }}
                                                type="number"
                                                name="startHour"
                                                placeholder="Enter Starting Hour"
                                                min={0}
                                                max={23}
                                                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label
                                                htmlFor="startMinute"
                                                className="mb-3 block text-sm font-medium text-white dark:text-white"
                                            >
                                                Start Minute
                                            </label>
                                            <input
                                                value={startMinute}
                                                onChange={(el) => { setStartMinute(el.target.value) }}
                                                min={0}
                                                max={59}
                                                type="number"
                                                name="startMinute"
                                                placeholder="Enter  Starting Minute"
                                                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>

                                        <div className="mb-8">
                                            <label
                                                htmlFor="endHour"
                                                className="mb-3 block text-sm font-medium text-white dark:text-white"
                                            >
                                                EndHour
                                            </label>
                                            <input
                                                value={endHour}
                                                onChange={(el) => { setEndHour(el.target.value) }}
                                                min={0}
                                                max={23}
                                                type="number"
                                                name="interval"
                                                placeholder="Enter Time-Slot Interval"
                                                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>

                                        {/* <div className="mb-8">
                                            <label
                                                htmlFor="endMinute"
                                                className="mb-3 block text-sm font-medium text-white dark:text-white"
                                            >
                                                End Minutes
                                            </label>
                                            <input
                                                value={endMinute}
                                                onChange={(el) => { setEndMinute(el.target.value) }}
                                                min={0}
                                                max={23}
                                                type="number"
                                                name="endMinute"
                                                placeholder="Enter Time-Slot Interval"
                                                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div> */}




                                        <div className="mb-8">
                                            <label
                                                htmlFor="email"
                                                className="mb-3 block text-sm font-medium text-white dark:text-white"
                                            >
                                                Interval
                                            </label>
                                            <input
                                                value={interval}
                                                onChange={(el) => { setInterval(el.target.value) }}
                                                min={0}
                                                max={59}
                                                type="number"
                                                name="interval"
                                                placeholder="Enter Time-Slot Interval"
                                                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>


                                        <div className="mb-6">
                                            <button className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                onClick={handleSubmit}>
                                                Create Slots
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            )}
                            {isCreated && (
                                    <div className="flex  mt-48 justify-center">
                                       <div className="flex justify-center">
                                       <h3 className="text-primary font-bold text-3xl w-full">Slots Already Created  <button className="py-2 px-4 bg-green text-dark" onClick={()=>{     window.location.reload();}}>Back</button></h3>
                                       
                                        </div>
                                    </div>
                                )
                            }


                        </div>

                    </div>
                </div>


            </div>
        </section>
    </>
}

export default Calendar;