"use client";
import ReactCalendar from "react-calendar";
import { DateType } from "./datetype";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Calendar = () => {
  const router = useRouter();
  const [date, setDate] = useState<DateType>({
    justDate: null,
    justTime: null,
  });
  const [slots, setSlots] = useState([]);

  const handleDate = async (date) => {
    try {
      date.preventDefault;
      await setDate((prev) => ({ ...prev, justDate: date }));
      if (date) {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let timing = `${day}/${month}/${year}`;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}appointment/byDate`,
          {
            headers: {
              authorization: `Bearer ${Cookie.get("Jwt")}`,
              "Content-Type": "application/json",
            },
            params: {
              doctorId: Cookie.get("doctorId"),
              timing: timing,
            },
          }
        );
        setSlots(res.data.result);
      }
    } catch (err) {
      toast.error("🦄 Doctor is not Present At This Date", {
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



  const handlebutton1 = async (slotId) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/bookAppointment`,
        { id: slotId },
        {
          headers: {
            authorization: `Bearer ${Cookie.get("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.result) {
        toast.success("🦄 Your Appointment Booked Successfully", {
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
    } catch (err) {
      toast.error("🦄 Appointment Is Not Booked At This Time", {
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
            Book Your Appointment
          </h1>
          <div className="-mx-4 flex  justify-center">
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div
                className="wow fadeInUp mb-12 rounded-md  sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s
              "
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
                {slots.length > 0 && (
                  <div className="mt-36 flex flex-wrap gap-8">
                    {slots.map((time) => (
                      <div
                        key={`${time._id}`}

                      >
                        {time.patientId === null && (
                          <button
                            className="rounded-lg bg-primary p-4 text-dark hover:bg-opacity-80"
                            type="button"
                            onClick={(el) => {
                              el.preventDefault;
                              const slotId = time._id;
                              handlebutton1(slotId);
                              setDate((prev) => ({ ...prev, justTime: time }));
                            }}
                          >
                            {`${time.startHour} : ${time.startMinute === 0 ? "00" : time.startMinute
                              }`}
                          </button>
                        )}

                        {time.patientId !== null && (
                          <button
                            className="rounded-lg bg-[#FF5733] p-4 text-dark bg-opacity-50"
                            type="button"
                            disabled
                            onClick={(el) => {
                              el.preventDefault;
                              const slotId = time._id;
                              handlebutton1(slotId);
                              setDate((prev) => ({ ...prev, justTime: time }));
                            }}
                          >
                            {`${time.startHour} : ${time.startMinute === 0 ? "00" : time.startMinute
                              }`}
                          </button>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            className="ml-80 mb-8 mt-16 rounded-md bg-green p-4 px-12 text-dark hover:bg-opacity-50  "
            onClick={() => {
              router.back();
            }}
          >
            {" "}
            Back
          </button>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Calendar;
