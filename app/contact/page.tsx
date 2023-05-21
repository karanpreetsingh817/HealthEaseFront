import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Thank you for your interest in our hospital. We welcome your questions, comments, and feedback. Our team is here to assist you in any way we can, and we are committed to providing you with the best possible experience. You can reach us by phone, email, or by using the contact form below. We will respond to your inquiry as soon as possible. We look forward to hearing from you."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
