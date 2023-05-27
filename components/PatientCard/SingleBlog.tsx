import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ patient }) => {
  const { name,bloodGroup,age,_id,address ,phoneNumber ,profileImg} = patient;
  return (
    <>
      <div
        className="wow fadeInUp relative overflow-hidden rounded-md   bg-white bg-opacity-80 shadow-one h-150"
        data-wow-delay=".1s"
      >
        <Link 
         href={`/doc-allpatient/${patient._id}`}  
        className="relative block h-[220px] w-full">
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
            Patient
          </span>
          <div className="relative w-full h-0 aspect-w-4 aspect-h-3">  <Image src={profileImg.url} alt="image" width={5000}  height={3000} style={{ objectFit: "contain" }} /></div>
         
        </Link>
        <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8 mt-16">
          <h3>
            <Link
              href={`/doc-allpatient/${_id}`}  
              className="mb-4 block text-xl font-bold text-dark  hover:text-primary dark:text-dark dark:hover:text-primary sm:text-2xl"
            >
              {name}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base  text-dark dark:border-white dark:border-opacity-10">
            {address}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={profileImg.url} alt="author" fill/>
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-dark">
                   {phoneNumber}
                </h4>
                <p className="text-xs text-body-color">{bloodGroup}</p>
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
