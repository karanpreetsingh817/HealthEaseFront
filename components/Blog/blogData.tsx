import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Get the Best Care for Your Skin",
    paragraph:
      " we understand that healthy, radiant skin is important to your overall well-being and confidence. That's why we have assembled a team of highly trained and experienced dermatology experts who are dedicated to providing personalized care and the latest treatments to help you achieve your skin health goals",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Ritika Verma",
      image: "/images/blog/author-01.png",
      designation: "Dermatologist",
    },
    tags: ["Skin Specialist"],
    publishDate: "2023",
  },
  {
    id: 2,
    title: "Get personalized care for your unique neurological.",
    paragraph:
      "we understand that each patient's neurological condition is unique and requires personalized care. That's why we have a team of experienced neurology specialists who are dedicated to providing individualized care to each of our patients. We use the latest diagnostic tools and techniques diagnose your condition.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Ramesh Sharma",
      image: "/images/blog/author-02.png",
      designation: "Neurologist",
    },
    tags: ["Brain Expert"],
    publishDate: "2023",
  },
  {
    id: 3,
    title: "Our Cardiology team offers a personalized approach to your heart health.",
    paragraph:
      " we understand that every patient is unique and has their own specific heart health needs. That's why our team of Cardiology specialists provides a personalized approach to every patient's heart health care to help diagnose heart conditions  ",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Rahul Kumar",
      image: "/images/blog/author-03.png",
      designation: "Cardiologist",
    },
    tags: ["Heart Specialist"],
    publishDate: "2023",
  },
];
export default blogData;
