'use client'
import Cookie from "js-cookie"
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ doctor }) => {
  const role=Cookie.get("role")
  const { description,profileImg,name,qualification,specialization,age,experience,_id } = doctor;
  return (
    <>
      <div
        className="wow fadeInUp relative overflow-hidden rounded-md   bg-white bg-opacity-80 shadow-one h-150"
        data-wow-delay=".1s"
      >
        <Link 
        href={`/show-alldoctor/${_id}` }  
        className="relative block h-[220px] w-full ">
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-dark py-2 px-4 text-sm font-semibold capitalize text-white">
            {qualification}
          </span>
          <Image className="mt-12" src={`https://res.cloudinary.com/dgtv2w9av/image/upload/v1684475795/tpvigvnidpwwxc48edvm.jpg`} alt="image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} fill/>
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
             href={`${role === 'doc-profile' ? '/admin-totaldoctor/' + _id : '/show-alldoctor/' + _id}`}
              className="mb-4 pt-12 block text-xl font-bold text-dark  hover:text-primary dark:text-dark dark:hover:text-primary sm:text-2xl"
            >
              {experience}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base  text-body-color dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/udHvbKwV-IMG-Dubai-UAE-1.jpg"} alt="author" fill/>
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-dark">
                  By {name}
                </h4>
                <p className="text-xs text-body-color">{specialization}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-dark">
                Age
              </h4>
              <p className="text-xs text-body-color">{age}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
