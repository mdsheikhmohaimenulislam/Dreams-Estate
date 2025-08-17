import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data) {
      toast.success("Successfully Submit");
      e.target.reset();
    }
  };

  return (
    <section className="bg-gray-100 mt-20">
      {/* Back Button */}
      <div className="max-w-6xl pt-6 px-4 flex justify-start">
        <div className="w-full flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="btn text-sm text-white bg-[#124d57] flex items-center gap-2"
          >
            <FaArrowLeft /> Back Home
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center  py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Your dream home is just a message away! Ask us anything about buying,
          selling, or renting — we’ll get back to you quickly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />
          </div>
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            required
          ></textarea>
          <button type="submit" className="btn bg-[#124d57] text-white ">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
