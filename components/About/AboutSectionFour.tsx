import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/ab4.jpg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Digital eyechecups
                </h3>
                <p className="text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed">
                Digital eyechecups are advanced diagnostic tools that use digital technology to improve the accuracy and efficiency of eye examinations. Here are some of the key points of digital eyechecups:
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-white dark:text-fs sm:text-2xl lg:text-xl xl:text-2xl">
                Non-invasive
                </h3>
                <p className="text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed">
                Digital eyechecups are non-invasive and do not require any contact with the eye. This makes them more comfortable for patients and reduces the risk of infection or injury.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-white dark:text-fs sm:text-2xl lg:text-xl xl:text-2xl">
                Portable
                </h3>
                <p className="text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed">
                Many digital eyechecups are portable and can be used in a variety of settings, including hospitals, clinics, and remote locations. This makes them a useful tool for providing eye care in underserved areas or during emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default AboutSectionTwo;
