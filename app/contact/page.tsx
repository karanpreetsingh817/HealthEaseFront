'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import {useState} from "react"
import axios from "axios"
import Cookie from "js-cookie"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [userName,setUserName]=useState("");
  const [issue,setIssue]=useState("")

  const handleSubmit=async(el)=>{
    el.preventDefault();
    let route="patient"
    if(Cookie.get("role")==="profile"){
      route="patient"
    }
    else{
      route="doctor"
    }
    try{
      const res= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${route}/postTicket`,{userName,issue},{
        headers: {
          "authorization": `Bearer ${Cookie.get("Jwt")}`,
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      toast.success('🦄 Your Issues Is Raised SucessFully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    setUserName("");
    setIssue("")

    }
    catch(err){
      toast.error('🦄 Your Ticket Is Not Genrated At The moment Please Try Again Later', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
       
    })
  }

  }
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Thank you for your interest in our hospital. We welcome your questions, comments, and feedback. Our team is here to assist you in any way we can, and we are committed to providing you with the best possible experience. You can reach us by phone, email, or by using the contact form below. We will respond to your inquiry as soon as possible. We look forward to hearing from you."
      />

<section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex justify-center">
            <div className="w-full px-4 lg:w-7/12 xl:w-full">
              <div
                className="wow fadeInUp mb-12 rounded-md bg-white bg-opacity-80 bg-blur-sm py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s
              "
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Need Help? Open a Ticket
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Our support team will get back to you ASAP via email.
                </p>
                <form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:full">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                        value={userName}
                        onChange={(el)=>{setUserName(el.target.value)}}
                          type="text"
                          placeholder="Enter your name"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary  focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Message
                        </label>
                        <textarea
                        value={issue}
                        onChange={(el)=>{setIssue(el.target.value)}}
                          name="message"
                          rows={5}
                          placeholder="Enter your Message"
                          className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      onClick={handleSubmit}>
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
          


        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default ContactPage;
