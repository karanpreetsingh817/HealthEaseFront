'use client'
import blogData from "@/components/Blog/blogData";
import DoctorCard from "@/components/DoctorCard/SingleBlog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";


const AfterLogIn = () => {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [doctors, setDoctors]=useState([])

    const callAboutpage = async () => {

        try {

            const res = await axios.get("http://localhost:8080/v1/patient/topDoctor", {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                },


            });
            console.log(res.data.result)
            setDoctors(res.data.result)

        }
        catch (err) {
            // alert(err.response.data.message);

        }
    }

    const handleSearch = async (el) => {
        el.preventDefault();
        try {
            const res = await axios.get("http://localhost:8080/v1/patient/findByName", {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                },
                params:{
                    name:search
                },
                withCredentials:true
            });

            const doctor=res.data.result;
            console.log(res.data.result)
            router.push(`/show-alldoctor/${doctor._id}`)
        

        }
        catch (err) {
            console.log(err.response)
            // router.push('/')
        }

    }

    useEffect(() => {
        callAboutpage();



    })



    return (
        <>
            <section className="pt-[150px] pb-[120px]">
                <div className="container">

                    <form className="flex items-center justify-center w-full mb-10  ">
                        <input
                            value={search}
                            onChange={(el) => { setSearch(el.target.value) }}
                            type="text"
                            placeholder="Search Doctor Here.........."
                            className="palceholder-body-color mr-5 w-full rounded-md border border-transparent py-3 px-5 text-base font-medium dark:text-body-color outline-none focus:border-primary bg-white backdrop-blur-md bg-opacity-90 dark:bg-fs text-black dark:bg-opacity-10"
                        />
                        <button className="flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-md bg-primary text-white"
                            onClick={handleSearch}>
                            <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.4062 16.8125L13.9375 12.375C14.9375 11.0625 15.5 9.46875 15.5 7.78125C15.5 5.75 14.7188 3.875 13.2812 2.4375C10.3438 -0.5 5.5625 -0.5 2.59375 2.4375C1.1875 3.84375 0.40625 5.75 0.40625 7.75C0.40625 9.78125 1.1875 11.6562 2.625 13.0937C4.09375 14.5625 6.03125 15.3125 7.96875 15.3125C9.875 15.3125 11.75 14.5938 13.2188 13.1875L18.75 17.6562C18.8438 17.75 18.9688 17.7812 19.0938 17.7812C19.25 17.7812 19.4062 17.7188 19.5312 17.5938C19.6875 17.3438 19.6562 17 19.4062 16.8125ZM3.375 12.3438C2.15625 11.125 1.5 9.5 1.5 7.75C1.5 6 2.15625 4.40625 3.40625 3.1875C4.65625 1.9375 6.3125 1.3125 7.96875 1.3125C9.625 1.3125 11.2812 1.9375 12.5312 3.1875C13.75 4.40625 14.4375 6.03125 14.4375 7.75C14.4375 9.46875 13.7188 11.125 12.5 12.3438C10 14.8438 5.90625 14.8438 3.375 12.3438Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </form>

                    <div className="mb-10 w-full overflow-hidden rounded">
                        <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                            <Image
                                src="/images/blog/blog-details-02.jpg"
                                alt="image"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="mb-10 text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                            "<strong className="text-primary dark:text-green"> Our Healthcare</strong> providers specialize in a wide range of medical fields, offering comprehensive care to meet the unique needs of our patients.
                            We understand that seeking<strong className="text-primary dark:text-green"> medical care </strong> can be a stressful experience, which is why our doctors are not only skilled in their craft but also <strong className="text-primary dark:text-green"> compassionate and empathetic </strong> towards our patients. They take the time to listen to their concerns, answer any questions they may have, and work collaboratively with them to provide the best possible care".
                        </p>
                    </div>

                    <div className="-mx-4 flex flex-wrap justify-center">

                        {doctors.map((doctor) => (
                            <div
                                key={doctor._id}
                                className="w-full px-4  mt-12 md:w-2/3 lg:w-1/2 xl:w-1/3"
                            >
                                <DoctorCard doctor={doctor} />
                            </div>
                        ))}
                    </div>

                    <div className="wow fadeInUp relative mx-auto mb-12 max-w-full text-center lg:m-0 mt-16  flex  justify-end ">
                        <Link
                            href="/show-alldoctor"
                            className="ease-in-up rounded-md py-3 px-8 mt-12 text-base bg-primary font-bold text-dark transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9 w-[500] ">
                            Show All Doctors
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AfterLogIn;
