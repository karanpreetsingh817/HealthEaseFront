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
        qualification: null,
        description: null,
        specialization: null,
        experience: null,
        appointmentFee: null,
        dateOfCreation: null

    });
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [qualification, setQualification] = useState("")
    const [description, setDescription] = useState("")
    const [specialization, setSpecialization] = useState('');
    const [appointmentFee, setAppointmentFee] = useState("")
    const [experience, setExperience] = useState("")

    const [doc, setDoc] = useState("")

    useEffect(() => {
        const fetchData = async () => {


            const { data } = await axios.get(`http://localhost:8080/v1/doctor/${Cookie.get("doctorId")}`, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(data.result);
            setDoctor(data.result);


        }
        fetchData();
    });




    const handleSubmit = async () => {
        try {

            const { data } = await axios.patch(`http://localhost:8080/v1/doctor/updateDoctor`, {
                id:Cookie.get("doctorId"),
                name:name || doctor.name,
                email :email || doctor.email,
                qualification :qualification ||doctor.qualification,
                description : description || doctor.description,
                specialization : specialization || doctor.specialization,
                experience: experience || doctor.experience,
                appointmentFee : appointmentFee || doctor.appointmentFee
            }, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                }
            });
           router.push(`/admin-totaldoctor/${Cookie.get("doctorId")}`)
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


                        <div className="flex items-start my-8 flex-col ml-8">
                            <h2 className="font-bold  w-full text-white tracking-wide">Description</h2>
                            <textarea
                                value={description}
                                onChange={(el) => { setDescription(el.target.value) }}
                                name="name"
                                placeholder={doctor.description}
                                className="font-bold w-full rounded-md border border-transparent py-3 pr-4 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent "
                                rows={4} // Adjust the number of rows here
                            />

                        </div>

                    </div>


                    <div className="w-full px-4 lg:w-2/3 mt-12 mb-10 rounded-md  p-6 lg:mt-0 ">
                        <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">

                            <div className="mb-9 ml-8">
                                <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl ">
                                    Your Profile
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
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Qualification  </p>
                                    <input

                                        value={qualification}
                                        onChange={(el) => { setQualification(el.target.value) }}
                                        type="text"
                                        name="name"
                                        placeholder={doctor.qualification}
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
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Specialization  </p>
                                    <input

                                        value={specialization}
                                        onChange={(el) => { setSpecialization(el.target.value) }}
                                        type="text"
                                        name="name"
                                        placeholder={doctor.specialization}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />

                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Experience  </p>
                                    <input

                                        value={experience}
                                        onChange={(el) => { setExperience(el.target.value) }}
                                        type="text"
                                        name="name"
                                        placeholder={doctor.experience}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />




                                <div className="grid grid-cols-3 gap-5 my-4">
                                    <p className="mt-4 font-bold  text-white dark:text-white ">Appointment Fee</p>
                                    <input

                                        value={appointmentFee}
                                        onChange={(el) => { setAppointmentFee(el.target.value) }}
                                        type="number"
                                        name="appointmentFee"
                                        placeholder={doctor.appointmentFee}
                                        className="  font-bold rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-primary shadow-one outline-none focus:border-none border-inherit focus-visible:shadow-none bg-transparent w-64 col-2"
                                    />
                                </div>
                                <hr />



                                <div className="grid grid-cols-3 gap-5 my-4 ">

                                    <button className=" w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp inline-block mt-4" onClick={() => { () => { router.push(`admin-totaldoctor/${Cookie.get("doctorId")}`) } }}>
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
