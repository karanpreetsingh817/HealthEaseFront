import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";


const Doctor = ({doctors}) => {
  return (
    <section id="blog" className="bg-white/5 bg-opacity-90 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Here List Of All Doctors"
          paragraph=""
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="w-full">
              <SingleBlog doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctor;
