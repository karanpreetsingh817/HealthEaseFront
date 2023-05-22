'use client'
import Calendar from "@/components/Calander/calander";
import {useRouter} from "next/navigation";

const Page=()=>{
    const router = useRouter()

    return<>

    <div>Book appointment</div>
    <Calendar/>
    

    </> 
}
export default Page