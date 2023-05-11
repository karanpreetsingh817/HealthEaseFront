'use client'
import Review from "@/components/ReviewCard";
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import axios from "axios"
import Cookie from "js-cookie"

const Page=()=>{
    // const router=useRouter();

    const [review,setReview]=useState();

    const callAboutpage=async()=>{
       
        try{
            
            const res = await axios.get("http://localhost:8080/v1/:doctorId/reviews",{
                headers: {
                    "authorization": `Bearer ${Cookie.get("Jwt")}`,
                    "Content-Type": "application/json"
                  },
            
                
            } );
               if(res.data.result){
                setReview(res.data.result);
               }
         
        
        }
        catch(err)

        {
            alert(err.response.data.message);
            // router.push("/")
        }
    }

useEffect(() => {
    callAboutpage();
    
   
 
}, [])

    return(<section >

        <Review title={"Doctor Ramesh Singh"} reviews={review}     />
       
        </section>
    )
}
export default Page