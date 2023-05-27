"use client";
import Image from "next/image";
import ReviewCard from "@/components/ReviewCard/index";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctor = () => {
  const router = useRouter();
  const x = usePathname();
  const [profileImg, setProfileImg] = useState("");
  const [doctor, setDoctor] = useState({});

  const [id, setId] = useState("");
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let y = x.split("/");
        setId(y[2]);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}patient/doctor/${id}`,
          {
            headers: {
              authorization: `Bearer ${Cookie.get("Jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDoctor(data.result);
        Cookie.set("doctorId", id);
        setReview(data.review);
        setProfileImg(data.result.profileImg.url);
      } catch (err) {
        toast.error("🦄 Failed To Get Doctor Details", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.back();
      }
    };
    fetchData();
  }, [id]);

  return (

      <section className="py-16 md:py-20 lg:py-28">
        <div className="bg-blur-lg  container   ">
          <div className="-mx-4 flex flex-wrap rounded-md">
            <div className="w-full px-4 lg:w-1/3">
              <div className="wow fadeInUp relative mx-auto mb-12  flex max-w-[500px] justify-center text-center lg:m-0">
                <Image
                  src={profileImg}
                  alt="Doctor-profile-IMG"
                  width={150}
                  height={150}
                  className="items-top mb-8 mt-4 rounded-full"
                />
              </div>
              <div className="mt-12  flex justify-center rounded-md bg-opacity-5 p-6 font-sans font-bold dark:bg-opacity-5 lg:mt-0">
                <h1>{doctor.name} </h1>
              </div>

              <div className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0  "></div>

              <div className="my-8 ml-8 flex flex-col items-start">
                <h2 className="w-full  font-bold tracking-wide text-green">
                  Description
                </h2>
                <p className="font-sans text-white">{doctor.description}</p>
              </div>
            </div>

            <div className="mt-12 mb-10 w-full rounded-md p-6 px-4  lg:mt-0 lg:w-2/3 ">
              <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
                <div className="mb-9 ml-8">
                  <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl ">
                    Your Profile
                  </h3>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-6">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Full Name{" "}
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {doctor.name}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Qualification
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {" "}
                      {doctor.qualification}{" "}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Email{" "}
                    </p>
                    <p className="col-span-2 mt-4 font-bold  text-white dark:text-white ">
                      {" "}
                      {doctor.email}{" "}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Specialization
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {" "}
                      {doctor.specialization}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Experience
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {" "}
                      {doctor.experience}{" "}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Date Of Joining
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {doctor.dateOfCreation}{" "}
                    </p>
                  </div>
                  <hr />

                  <div className="my-4 grid grid-cols-3 gap-5">
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      Appointment Fee
                    </p>
                    <p className="mt-4 font-bold  text-white dark:text-white ">
                      {" "}
                      $ {doctor.appointmentFee}{" "}
                    </p>
                  </div>
                  <hr />

                  <button
                    className=" mt-4 inline-block w-full justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    onClick={() => {
                      router.push("/book-appointment");
                    }}
                  >
                    Make Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {review && (
              <ReviewCard
                title={"What Our Patient Think About Doctor"}
                Reviews={review}
              />
            )}
            {!review && (
              <div className="z-10 h-1/2 w-full">Thereis no review</div>
            )}
          </div>

          <div className="flex justify-end   pb-8">
            <div className="w-1/2">
              <button
                className="w mr-8 inline-block justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </button>
            </div>

            <div className="w-1/2">
              <button
                className="w mr-8 inline-block justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                onClick={() => {
                  router.push("/doc-addreview");
                }}
              >
                Add Review
              </button>
              <button
                className="wjustify-center mr-8 inline-block rounded-md bg-primary py-4 px-9 text-base font-medium text-dark transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                onClick={() => {
                  router.push("doc-allreview");
                }}
              >
                All Reviews
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    

  );
};

export default Doctor;
