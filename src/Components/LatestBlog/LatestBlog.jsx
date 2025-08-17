import { Link } from "react-router";

const blogs = [
{
  id: 1,
  category: "News",
  title: "Dream Homes at Your Fingertips",
  excerpt:
    "Discover premium properties with ease. Dreams Estate connects buyers and sellers with trusted listings, expert guidance, and a smooth home-buying experience.",
  image: "https://i.ibb.co.com/DPRXKYzT/charming-yellow-house-with-wooden-windows-green-grassy-garden.jpg", // Replace with your image
  featured: true,
},
{
  id: 2,
  category: "News",
  title: "Your Global Gateway to Real Estate",
  excerpt:
    "From apartments to luxury villas, Dreams Estate makes property hunting simple and secure with verified listings and worldwide opportunities.",
  image: "https://i.ibb.co.com/k6xhp2d5/Whats-App-Image-2025-07-14-at-5-55-42-PM.jpg",
  featured: false,
},
{
  id: 3,
  category: "Tips & Tricks",
  title: "Buy Smarter, Invest Better",
  excerpt:
    "Get expert advice on finding the right property, making safe investments, and navigating the real estate market with confidence.",
  image: "https://i.ibb.co.com/HDR7zDwv/Whats-App-Image-2025-07-14-at-5-55-42-PM-2.jpg",
  featured: false,
}
];

const LatestBlog = () => {
  return (
    <section className="mt-20 w-11/12 rounded-lg mx-auto bg-gray-900 p-10">
      <div className="text-center mb-10">
        <h3 className="text-md uppercase font-semibold text-gray-500">Our Blog</h3>
        <h2 className="text-4xl font-bold text-white">
          Latest Blog <span className="text-blue-500">& Articles</span>
        </h2>
        <div className="mt-2 w-16 h-1 bg-blue-400 mx-auto rounded-full"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-3 gap-6 ">
        {/* Featured blog */}
        <div className="col-span-2 relative rounded overflow-hidden shadow-lg">
          <img
            src={blogs[0 ].image}
            alt={blogs[0].title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-6">
            <p className="text-sm text-blue-400 mb-1">{blogs[0].category}</p>
            <h3 className="text-lg font-bold mb-2">{blogs[0].title}</h3>
            <p className="text-sm">{blogs[0].excerpt}</p>
            <Link
              to="https://hendon.qodeinteractive.com/kensington/"
              className="inline-block mt-4 text-blue-400 hover:underline text-sm"
            >
              READ MORE →
            </Link>
          </div>
        </div>

        {/* Side blogs */}
        <div className="flex flex-col gap-6 mt-20">
          {blogs.slice(1).map((blog) => (
            <div key={blog.id} className="flex gap-4 items-start">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-[120px] h-[100px] object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-xs text-gray-400">{blog.category}</p>
                <h4 className="font-bold text-sm mb-1">{blog.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                <Link
                  to="https://hendon.qodeinteractive.com/kensington/"
                  className="inline-block mt-2 text-sm text-blue-500 hover:text-blue-500  transition"
                >
                  READ MORE →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
