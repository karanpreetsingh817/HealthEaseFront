import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";




export default function Home() {
  return (
    <>
      
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Testimonials />
      <Blog />      
    </>
  );
}
