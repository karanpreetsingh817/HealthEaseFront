"use client";
import ReactCalendar from "react-calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Calendar = () => {
    const router = useRouter();
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [startHour, setStartHour] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [interval, setInterval] = useState("30");
    const [endHour, setEndHour] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    // const [endMinute, setEndMinute] = useState("")
    const handleDate = async (date) => {
        setIsCreated(false);
        try {
            date.preventDefault;
            let timing;
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            setDay(day);
            setMonth(month);
            setYear(year);
            timing = `${day}/${month}/${year}`;
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}appointment/isCreated`,
                {
                    headers: {
                        authorization: `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json",
                    },
                    params: {
                        timing: timing,
                    },
                }
            );
            if (res.data.result) {
                setIsCreated(true);
                toast.warning(`🦄 Slots For ${timing} Date Is Already Created`, {
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
        } catch (err) {
            toast.error("🦄 There Is Problem While Checking Slots For This Date", {
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
    const handleSubmit = async (el) => {
        try {
            el.preventDefault();
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}appointment/createSlots`,
                { startHour, endHour, day, month, year, startMinute, interval },
                {
                    headers: {
                        authorization: `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.data) {
                toast.success("🦄 Slots For This  Date Is Created ", {
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
        } catch (err) {
            toast.error("🦄 There Is Error While Creating Slots", {
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

    return (
        <>
            <section
                id="contact"
                className="overflow-hidden py-20  md:py-20 lg:py-28 "
            >
                <div className="container ">
                    <h1 className="text-center text-4xl  font-bold  text-primary">
                        Select Date And Create Slots
                    </h1>
                    <div className="-mx-4 flex  justify-center">
                        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
                            <div
                                className="wow fadeInUp mb-12 rounded-md  sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                                data-wow-delay=".15s"
                            >
                                <ReactCalendar
                                    minDate={new Date()}
                                    className="REACT-CALENDAR p-2 "
                                    view="month"
                                    onClickDay={handleDate}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                {!isCreated && day && (
                                    <div className="mt-16 flex  justify-center  bg-dark bg-opacity-60 shadow-white ">
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
                                                    onChange={(el) => {
                                                        setStartHour(el.target.value);
                                                    }}
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
                                                    onChange={(el) => {
                                                        setStartMinute(el.target.value);
                                                    }}
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
                                                    onChange={(el) => {
                                                        setEndHour(el.target.value);
                                                    }}
                                                    min={0}
                                                    max={23}
                                                    type="number"
                                                    name="interval"
                                                    placeholder="Enter Time-Slot Interval"
                                                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                />
                                            </div>

                                            <div className="mb-8">
                                                <label
                                                    htmlFor="email"
                                                    className="mb-3 block text-sm font-medium text-white dark:text-white"
                                                >
                                                    Interval
                                                </label>
                                                <input
                                                    value={interval}
                                                    onChange={(el) => {
                                                        setInterval(el.target.value);
                                                    }}
                                                    min={0}
                                                    max={59}
                                                    type="number"
                                                    name="interval"
                                                    placeholder="Enter Time-Slot Interval"
                                                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <button
                                                    className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                    onClick={handleSubmit}
                                                >
                                                    Create Slots
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                {
                                isCreated && (
                                    <div className="mt-48  flex justify-center">
                                        <div className="flex justify-center">
                                            <h3 className="w-full text-3xl font-bold text-primary">
                                                Slots Already Created{" "}
                                                <button
                                                    className="bg-green py-2 px-4 text-dark"
                                                    onClick={() => {
                                                        window.location.reload();
                                                    }}
                                                >
                                                    Back
                                                </button>
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Calendar;
