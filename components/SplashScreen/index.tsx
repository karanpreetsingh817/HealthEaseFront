'use client'
import React ,{ useEffect, useState} from "react";

import Image from "next/image";
import anime from "animejs"
import img from "logo-l.png"

export default function SplashScreen({finishLoading}){

    const [isMounted,setIsMounted]=useState(false);

    const animate=()=>{
        const loader= anime.timeline({
            complete: ()=> finishLoading(),
        })

        loader.add({
            target:"#logo",
            delay:0,
            scale:1,
            duration:500,
            easing:"easeInOutExpo"

        })
        .add({
            target:"#logo",
            delay:0,
            scale:2,
            duration:500,
            easing:"easeInOutExpo"

        })
    }

    useEffect(()=>{
        const timeout=setTimeout(()=>setIsMounted(true),10)
        animate()
        return ()=>clearTimeout(timeout)
    })

    return <div
    className="flex  items-center justify-center h-screen"
   
    >
        <Image id="logo" src={img} alt="" height={60} width={60} />
    </div>
}

