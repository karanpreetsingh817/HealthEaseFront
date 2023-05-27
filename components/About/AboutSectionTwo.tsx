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
                src="https://res.cloudinary.com/dgtv2w9av/image/upload/v1685100016/clinical-reception-with-waiting-room-facility-lobby-registration-counter-used-patients-with-medical-appointments-empty-reception-desk-health-center-checkup-visits_g0fm6r.jpg"
                alt="about image"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-fs dark:text-fs sm:text-2xl lg:text-xl xl:text-2xl">
                Improved accuracy
                </h3>
                <p className="text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed">
                   Digital laboratory systems are designed to reduce errors and improve the accuracy of test results. They can flag abnormal results, reduce the risk of transcription errors, and minimize the risk of mislabeling samples.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-fs dark:text-fs sm:text-2xl lg:text-xl xl:text-2xl">
                Increased data accessibility
                </h3>
                <p className="text-base font-medium leading-relaxed text-fs sm:text-lg sm:leading-relaxed">
                Digital laboratory systems make it easier for healthcare providers to access patient data and test results. This can help to improve the speed and accuracy of diagnosis and treatment, and allow for better tracking of patient health over time.
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
