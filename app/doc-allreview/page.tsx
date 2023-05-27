"use client";
import Review from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const router = useRouter();

    const [review, setReview] = useState([]);

    const callAboutpage = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}doctor/${Cookie.get(
                    "doctorId"
                )}/reviews`,
                {
                    headers: {
                        authorization: `Bearer ${Cookie.get("Jwt")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setReview(res.data.result);
        } catch (err) {
            toast.error("🦄 Error While Fetching Reviews", {
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

    useEffect(() => {
        callAboutpage();
    },[]);

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <section>
                {review.length !== 0 && (
                    <Review title={"All Reviews Of Doctor"} Reviews={review} />
                )}
                {review.length === 0 && (
                    <div className="z-10 h-1/2 w-full">Thereis no review</div>
                )}

                <button
                    className="ml-40 mb-8 mt-16 rounded-md bg-green p-4 px-12 text-dark hover:bg-opacity-50  "
                    onClick={handleBack}
                >
                    {" "}
                    Back
                </button>
            </section>
            <ToastContainer />
        </>
    );
};
export default Page;
