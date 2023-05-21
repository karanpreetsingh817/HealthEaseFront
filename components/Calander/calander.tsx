'use client'
import ReactCalendar from "react-calendar";
import { DateType } from './datetype';
import { useState, useEffect } from "react"
import { format } from "date-fns";
import axios from "axios"
import Cookie from "js-cookie"

const Calendar = () => {

  const [date, setDate] = useState<DateType>({
    justDate: null,
    justTime: null
  });
  const [slots, setSlots] = useState([])

  const handleDate = async (date) => {
    try {
      date.preventDefault
      await setDate((prev) => ({ ...prev, justDate: date }));
      console.log(date)

      if (date) {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear()
        let timing = `${day}/${month}/${year}`
        console.log(timing)
        const res = await axios.get(`http://localhost:8080/v1/appointment/byDate`, {
          headers: {
            "authorization": `Bearer ${Cookie.get("Jwt")}`,
            "Content-Type": "application/json"
          },
          params: {
            doctorId: Cookie.get("doctorId"),
            timing: timing
          }
        });
        setSlots(res.data.result)
      }
    }
    catch (err) {
      alert(err)
    }
  }


  const handlebutton1 = async (slotId) => {
    try {
      const res = await axios.patch(`http://localhost:8080/v1/appointment/bookAppointment`, { id: slotId }, {
        headers: {
          "authorization": `Bearer ${Cookie.get("Jwt")}`,
          "Content-Type": "application/json"
        },
      })
      if (res.data.result) {
        alert("your appointment booked");
      }
    }
    catch (err) {
      console.log(err.response.statusCode);
    }
  }

  return <>
    <section id="contact" className="overflow-hidden py-20  md:py-20 lg:py-28 ">
      <div className="container ">
        <h1 className="text-primary font-bold  text-center  text-4xl">Book Your Appointment</h1>
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
              {slots.length > 0 && (
                <div className="flex gap-8 mt-36 flex-wrap">
                  {slots.map((time) => (
                    <div key={`${time._id}`} className="rounded-lg bg-primary hover:bg-opacity-80 text-dark p-4">
                      {time.patientId === null && <button type="button" onClick={(el) => {
                        el.preventDefault
                        const slotId = time._id;
                        handlebutton1(slotId)
                        setDate((prev) => ({ ...prev, justTime: time }))
                      }}>
                        {`${time.startHour} : ${time.startMinute === 0 ? '00' : time.startMinute}`}
                      </button>
                      }

                      {time.patientId!==null &&<button type="button" disabled className="w-full bg-grey bg-opacity-30 text-white" onClick={(el) => {
                        el.preventDefault
                        const slotId = time._id;
                        handlebutton1(slotId)
                        setDate((prev) => ({ ...prev, justTime: time }))
                      }}>{`${time.startHour} : ${time.startMinute === 0 ? '00' : time.startMinute}`}
                       
                      </button>} 

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>


      </div>
    </section>
  </>
}

export default Calendar;