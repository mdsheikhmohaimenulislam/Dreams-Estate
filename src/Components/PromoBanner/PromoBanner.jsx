import Marquee from "react-fast-marquee";

const PromoBanner = () => {
  return (
    <div className="w-full mt-20">
      {/* Top Notification Bar */}
      <div className="bg-blue-500 text-white text-sm md:text-lg lg:text-3xl text-center py-2 font-semibold tracking-wide uppercase flex items-center justify-center gap-2">
        <span role="img" aria-label="gift" className=" text-lg lg:text-4xl">
          🎁
        </span>
        Get up to 30% off on service fees for your next property purchase –
        limited time only!
      </div>

      {/* Background Image Banner */}
      <div className="relative h-[800px] w-full">
        {/* Background Image */}
        <img
          src="https://i.ibb.co.com/k6xhp2d5/Whats-App-Image-2025-07-14-at-5-55-42-PM.jpg"
          alt="Running Trail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-60"></div>

        {/* Overlay Text */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 -bottom-80">
          <Marquee
            speed={100}
            pauseOnHover
            gradient={false}
            className="cursor-pointer w-full"
          >
            <h2 className="text-white text-2xl md:text-8xl font-extrabold uppercase whitespace-nowrap">
              <span className="mx-6">Find your dream home and save big!</span>
              <span className="mx-6">/</span>
              <span className="mx-6">Enjoy up to 30% off on service fees</span>
              <span className="mx-6">/</span>
              <span className="mx-6">
                when buying your next property. Limited time offer – act fast!
              </span>
            </h2>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
