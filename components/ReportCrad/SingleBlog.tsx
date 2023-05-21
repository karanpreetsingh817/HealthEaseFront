import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ report }) => {
  const { name, _id, description, consultedBy , medicine} = report;
  return (
    <>
      <div
        className="wow fadeInUp relative overflow-hidden rounded-md   bg-dark bg-opacity-60 shadow-one h-150"
        data-wow-delay=".1s"
      >
        <Link
          href={`/${_id}`}
          className="relative block h-[220px] w-full">
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-dark py-2 px-4 text-sm font-semibold capitalize text-white">
            Report
          </span>
          <Image src={"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg"} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
              href={`/${_id}`}
              className="mb-4 block text-xl font-bold text-white  hover:text-primary dark:text-dark dark:hover:text-primary sm:text-2xl"
            >
              {name}
              {/* Add report name Here */}
            </Link>
          </h3>

          <p className="text-white ">{description}</p>
         
            <p className="text-white font-bold py-2">Medicines : {medicine}</p>
            
         

          <div className="flex justify-between w-3/5">
            <p className="text-white font-bold ">Consulted By :</p>
            <p className="text-white font-bold ">{consultedBy}</p>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
