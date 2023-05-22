"use client";
import {useState} from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {useRouter} from "next/navigation"

const   Forgetpass = () => {
  const router=useRouter()
  const [newPass,setNewPass]=useState('');
  const [currentPass,setcurrentPass]=useState('');
  const [newConfirmPass,setNewConfirmPass]=useState('');

  const handleSubmit=async(e)=>{
    try {
      e.preventDefault();
      const res = await axios.patch("http://localhost:8080/v1/patient/updatePassword", { currentPassword:currentPass,password:newPass, confirmPassword:newConfirmPass 
      
    },
    {headers: {
      "authorization": `Bearer ${Cookie.get("Jwt")}`,
      "Content-Type": "application/json"
    }
  });
      const user=res.data.result;
      console.log(res.data)
      alert("Plz login Again with new Password")
      Cookie.remove("Jwt");
      
      router.push("/")
     

     
     
    }

    catch (err) {
      alert(err.response.data.message);

      // send custom Error according to Status code or something like that
      // if(err.response.status===400 ){
      //   alert("invalid Credentials")
      // }
    }
    
  


  }

  

  return (
    <>
    
    
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md  py-10 px-6 dark:bg-dark sm:p-[60px]  bg-white bg-opacity-70">
                <h3 className=" pb-4 mb-3 text-center text-2xl font-bold text-dark dark:text-white sm:text-3xl border-b border-green">
                  Update Your Password
                </h3>
               
               
                <form>
                <div className="mb-8">
                    <label
                      htmlFor="oldpass"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Current Password
                    </label>
                    <input
                    value={currentPass}
                    onChange={(el)=>{setcurrentPass(el.target.value)}}
                      type="password"
                      name="oldpass"
                      placeholder="Enter Your Current Password"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>

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
                     value={newConfirmPass}
                     onChange={(el)=>{setNewConfirmPass(el.target.value)}}
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
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Forgetpass;
