"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState({});
    const [medicine, setMedicine] = useState("");

    const handle = async (event) => {
        const selectedFile = event.target.files[0];
    
        try {
          const formData = new FormData();
          formData.append("profileImg", selectedFile);
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}patient/upload`, formData);
          toast("Image Selected  Successfully")
          setImage({
            url: data.url,
            public_id: data.public_id,
          });
        } catch (err) {
          toast.error(`🦄 Plz select Image again!`, {
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
        el.preventDefault()
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}report/${Cookie.get("patientId")}`,
                { 
                    name,
                    description,
                    medicine,
                    image,
                    patientId:Cookie.get("patientId")
                },
                {
                    headers: {
                        authorization: `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.data.result) {
                toast.success('🦄 Review Added Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                router.push(`/doc-allpatient/${Cookie.get("patientId")}`)
            }
        } catch (err) {
            toast.error('🦄 There Is Problem While Adding Review', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <>
            <section id="contact" className="overflow-hidden py-20  md:py-20 lg:py-28 ">
                <div className="container ">
                    <div className="-mx-4 ml-48 flex flex-wrap">
                        <div className="w-full px-4 lg:w-8/12 xl:w-9/12">
                            <div
                                className="wow fadeInUp mb-12 rounded-md bg-white bg-opacity-80 py-11 px-8 backdrop-blur-md dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                                data-wow-delay=".15s
              "
                            >
                                <h2 className="mb-3 text-2xl font-bold text-primary dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Add Patient Report
                                </h2>

                                <form>
                                    <div className="-mx-4 flex flex-wrap">
                                        <div className="w-full px-4">
                                            <div className="mb-8">
                                                <input
                                                    value={name}
                                                    onChange={(el) => {
                                                        setName(el.target.value);
                                                    }}
                                                    name="name"
                                                    placeholder="Enter Report Name"
                                                    className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                ></input>
                                            </div>
                                        </div>

                                        <div className="w-full px-4">
                                            <div className="mb-8">
                                                <input
                                                    value={medicine}
                                                    onChange={(el) => {
                                                        setMedicine(el.target.value);
                                                    }}
                                                    name="medicine"
                                                    type="text"
                                                    placeholder="Enter Medicines"
                                                    className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                ></input>
                                            </div>
                                        </div>

                                        <div className="w-full px-4">
                                            <div className="mb-8">
                                                <input
                                                 onChange={handle}
                                                    type="file"
                                                    name="profileImg"
                                                    placeholder="Select Your Profile Image"
                                                    accept="image/*"
                                                    className="w-full rounded-md border border-transparent py-3 px-6 text-base bg-dark text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full px-4">
                                            <div className="mb-8">
                                                <textarea
                                                    value={description}
                                                    onChange={(el) => {
                                                        setDescription(el.target.value);
                                                    }}
                                                    name="message"
                                                    rows={5}
                                                    placeholder="Enter Description Of Report"
                                                    className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-white shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="w-full px-4">
                                            <button
                                                className="rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                onClick={handleSubmit}
                                            >
                                                Add Report
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-5/12 xl:w-4/12"></div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Contact;
