'use client'
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation";
import {useState} from "react"
const page=()=>{
    const router=useRouter()
    const x = usePathname();
    let y = x.split("/")
    const [newPass,setNewPass]=useState("");
    const [confirmPass,setConfirmPass]=useState("")
    const handleSubmit=async(el)=>{
        el.preventDefault()
        try{
            const {data}=await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}doctor/resetPass`,{token:y[2], password:newPass},
           { headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
             } )
             router.push("/")

        }
        catch(err){
            console.log(err.response)

        }
       
    }
return(
    
    
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md  py-10 px-6 dark:bg-dark sm:p-[60px]  bg-white bg-opacity-70">
                <h3 className=" pb-4 mb-3 text-center text-2xl font-bold text-dark dark:text-white sm:text-3xl border-b border-green">
                  Reset Your Password
                </h3>
               
               
                <form>

                  <div className="mb-8">
                    <label
                      htmlFor="newpass"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                     value={newPass}
                     onChange={(el)=>{setNewPass(el.target.value)}}
                      type="password"
                      name="newpass"
                      placeholder="Enter Your New Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="confirmpass"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                     value={confirmPass}
                     onChange={(el)=>{setConfirmPass(el.target.value)}}
                      type="password"
                      name="confirmpass"
                      placeholder="Enter  Confirm Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                 
              
                  <div className="mb-6">
                    <button className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    onClick={handleSubmit}>
                     Update Password
                    </button>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </section>
)
}

export default page;