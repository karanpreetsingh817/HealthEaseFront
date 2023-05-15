'use client'
import Review from "@/components/ReviewCard";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios"
import Cookie from "js-cookie"

const Page = () => {
    const router = useRouter();

    const [review, setReview] = useState([]);

    const callAboutpage = async () => {

        try {

            const res = await axios.get(`http://localhost:8080/v1/doctor/${Cookie.get("doctorId")}/reviews`, {
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                },


            });
           
                setReview(res.data.result);
            


        }
        catch (err) {
            console.log(err)
            
        }
    }

    useEffect(() => {
        callAboutpage();
        console.log(review)



    }, [])

    return (<section >
        { review.length!==0 &&(

            <Review title={"All Reviews Of Doctor"} Reviews={review} />
        )
        }
        { review.length===0 &&(
           
           <div className="h-1/2 w-full z-10">Thereis no review</div>
        )
        }

    </section>
    )
}
export default Page