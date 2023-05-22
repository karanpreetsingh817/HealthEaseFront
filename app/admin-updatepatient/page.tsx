"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie"
import { useRouter } from "next/navigation";

const Doctor = () => {
    const router = useRouter();
    const [doctor, setDoctor] = useState({
        name: null,
        email: null,
        age: null,
        bloodGroup: null,
        address: null,
        phoneNumber: null,
        dateOfCreation: null

    });
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        const fetchData = async () => {


            const { data } = await axios.get(`http://localhost:8080/v1/doctor/showOnePatient`, {
                headers: {
                  "authorization": `Bearer ${Cookie.get("Jwt")}`,
                  "Content-Type": "application/json"
                },
                params: {
                  patientId: Cookie.get("patientId")
                },
                withCredentials: true
        
        
              });
            console.log(data.result);
            setDoctor(data.result);


        }
        fetchData();
    });




    const handleSubmit = async () => {
        try {

            const { data } = await axios.patch(`http://localhost:8080/v1/doctor/updatePatient`, {
                id: Cookie.get("patientId"),
                name: name || doctor.name,
                email: email || doctor.email,
                age: age || doctor.age,
                address: address || doctor.address,
                phoneNumber: phoneNumber || doctor.phoneNumber,
                bloodGroup: bloodGroup || doctor.bloodGroup
            }, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                }
            });
            router.push(`/admin-totalpatient/${Cookie.get("patientId")}`)
        }

        catch (err) {
            console.log(err.response)
        }


    }

    return (


        <section className="py-16 md:py-20 lg:py-28">

            <div className="container  bg-blur-lg   ">

                <div className="-mx-4 flex flex-wrap rounded-md">
                    <div className="w-full px-4 lg:w-1/3">

                        <div className="wow fadeInUp relative mx-auto mb-12  max-w-[500px] text-center lg:m-0 flex justify-center">

                            <Image src="/images/doctor/Docpro.jpg" alt="Doctor-profile-IMG" width={150} height={150} className="rounded-full mb-8 items-top mt-4" />

                        </div>
                        <div className="mt-12  rounded-md bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0 flex justify-center font-sans font-bold">
                            <h1>{doctor.name} </h1>
                        </div>



                        <div className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0  ">

                        </div>


                       

                    </div>


                    <div className="w-full px-4 lg:w-2/3 mt-12 mb-10 rounded-md  p-6 lg:mt-0 ">
                        <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">

                            <div className="mb-9 ml-8">
                                <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl ">
                                    Update Patient
                                </h3>
                                <hr />

                                <div className="grid grid-cols-3 gap-6 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Full Name  </p>
                                    <input

                                        value={name}
                                        onChange={(el) => { setName(el.target.value) }}
                                        type="text"
                                        name="name"
                                        placeholder={doctor.name}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Age  </p>
                                    <input

                                        value={age}
                                        onChange={(el) => { setAge(el.target.value) }}
                                        type="number"
                                        name="name"
                                        placeholder={doctor.age}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Email  </p>
                                    <input

                                        value={email}
                                        onChange={(el) => { setEmail(el.target.value) }}
                                        type="email"
                                        name="email"
                                        placeholder={doctor.email}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Phone Number  </p>
                                    <input

                                        value={phoneNumber}
                                        onChange={(el) => { setPhoneNumber(el.target.value) }}
                                        type="number"
                                        name="name"
                                        placeholder={doctor.phoneNumber}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                
                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Address  </p>
                                    <input

                                        value={address}
                                        onChange={(el) => { setAddress(el.target.value) }}
                                        type="text"
                                        name="address"
                                        placeholder={doctor.address}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">BloodGroup  </p>
                                    <input

                                        value={bloodGroup}
                                        onChange={(el) => { setBloodGroup(el.target.value) }}
                                        type="text"
                                        name="name"
                                        placeholder={doctor.bloodGroup}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />




                               



                                <div className="grid grid-cols-3 gap-5 my-4 ">

                                    <button className=" w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mt-4" onClick={() => { () => { router.push(`admin-totaldoctor/${Cookie.get("patientId")}`) } }}>
                                        Back
                                    </button>


                                    <button className=" w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mt-4" onClick={handleSubmit}>
                                        Done
                                    </button>




                                </div>


                            </div>
                        </div>
                    </div>






                </div>










            </div>
        </section >

    );
};



export default Doctor;
