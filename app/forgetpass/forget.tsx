"use client";
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Forgetpass = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [page, setPage] = useState(false)
  const handleSubmit = async (el) => {
    el.preventDefault();
    try {
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}patient/forgetPassword`, { email },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
      setPage(true)
      toast.success('🦄 Token Send Successfully ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    catch (err) {
      toast.error('🦄 There Is Error While Sending Password Reset Token', {
        position: "top-center",
        autoClose: 5000,
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


      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">


          {
            !page && (
              <>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mx-auto max-w-[500px] rounded-md bg-white bg-opacity-80 backdrop-blur-md py-10 px-6 dark:bg-dark sm:p-[60px]">
                      <h3 className=" pb-4 mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl border-b border-green">
                        Forget Your Password
                      </h3>


                      <form>
                        <div className="mb-8">
                          <label
                            htmlFor="email"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            onChange={(el) => { setEmail(el.target.value) }}
                            placeholder="Enter Your Register Email"
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>


                        <div className="mb-6">
                          <button className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                            onClick={handleSubmit}>
                            Send Token
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>


              </>
            )
          }

          {
            page && (
              <>
                <div className="p-16 flex justify-center text-2xl flex-row" >
                  <h1 className="text-green mr-8">Token Successfully Send To Your Email</h1>
                  <button className=" items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    onClick={() => { router.push("/") }}>
                    Back
                  </button>
                </div>

              </>
            )
          }
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default Forgetpass;
