"use client";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import "../styles/Home.css"
import { Montserrat } from '@next/font/google';
import SplashScreen from "../components/SplashScreen"
import { usePathname } from "next/navigation";
import {useEffect, useState} from "react";

// const montserrat = Roboto_Mono({ subsets: ["latin"], weight:'100'});
const inter = Montserrat({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const pathname=usePathname();
  // const isHome=pathname==='/';
  // const [isLoading,setIsLoading]=useState(isHome);

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);
  // useEffect(()=>{
  //   if(isLoading) return
  // },[isLoading])
  return (
    <html lang="en"className={`${inter.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="dark:bg-black {montserrat.className}">
        {

          isLoading  ? (
            <SplashScreen finishLoading={()=> setIsLoading(false)}/>
          ):
          (
            <>
            <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers></>
        )}
        
      </body>
    </html>
    
  );
}

import { Providers } from "./providers";