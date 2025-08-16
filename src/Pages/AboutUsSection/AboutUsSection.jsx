import CountUp from "react-countup";
import { FaPlay } from "react-icons/fa";

export default function AboutUsSection() {
  const handleClick = () => {
    console.log(`Sorry
This video does not exist.`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:flex lg:items-center lg:gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We are the leaders in selling and renting houses.
          </h2>
          <p className="text-gray-600 mb-4">
            Dreams Estate stands as the unrivaled leader in selling and renting
            houses, delivering unparalleled expertise and a client-centric
            approach to the real estate market. With a vast portfolio of
            properties, from cozy family homes to luxurious rentals, we make
            buying, selling, and renting seamless and stress-free. Our proven
            track record, innovative tools, and dedicated team ensure every
            client finds their perfect home or investment opportunity. Choose
            Dreams Estate for a trusted partner committed to turning your real
            estate vision into reality.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">
                <CountUp duration={2} enableScrollSpy end={820} />
              </p>
              <p className="text-gray-500 text-sm">Modern Properties</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">
                <CountUp duration={2} enableScrollSpy end={145} />
              </p>
              <p className="text-gray-500 text-sm">Experienced Agents</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">
                <CountUp duration={2} enableScrollSpy end={535} />
              </p>
              <p className="text-gray-500 text-sm">Happy Clients</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">
                <CountUp duration={2} enableScrollSpy end={35} />
              </p>
              <p className="text-gray-500 text-sm">Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Image / Video */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
          <img
            src="https://i.ibb.co.com/dwkLqxtc/Whats-App-Image-2025-07-14-at-5-55-43-PM.jpg"
            alt="Modern house"
            className="rounded-xl shadow-lg w-full h-auto"
          />

          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-blue-500 hover:text-white transition"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <FaPlay onClick={handleClick} className="w-5 h-5" />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-3/5 md:w-2/5 lg:w-1/4 bg-gray-900 lg:ml-150">
              <h3 className="font-bold text-2xl text-center text-white">
                Sorry
              </h3>
              <p className=" mt-2 text-center text-gray-400">
                This video does not exist.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  );
}
