import Marquee from "react-fast-marquee";

import {
  Home,
  Search,
  MapPin,
  Building2,
  Users,
  Shield,
  CreditCard,
  Calendar,
  Globe,
  Heart,
  FileText,
  Rocket,
} from "lucide-react";

const features = [
  { icon: Home, text: "Buy & Sell Properties" },
  { icon: Search, text: "Advanced Property Search" },
  { icon: MapPin, text: "Location-Based Listings" },
  { icon: Building2, text: "Verified Real Estate Listings" },
  { icon: Users, text: "Connect with Agents & Buyers" },
  { icon: Shield, text: "Secure & Trusted Transactions" },
  { icon: CreditCard, text: "Online Payment Integration" },
  { icon: Calendar, text: "Schedule Property Visits" },
  { icon: Globe, text: "Multi-Region Coverage" },
  { icon: Heart, text: "Wishlist & Favorites" },
  { icon: FileText, text: "Detailed Property Descriptions" },
  { icon: Rocket, text: "Fast & Responsive Platform" },
];

// simple marquee component
export default function ElementsSection() {
  return (
    <section className="w-11/12 mx-auto mt-20 rounded-lg bg-gray-900 text-white py-16 px-10">
      <div className="flex-col flex md:flex-row-reverse max-w-8xl mx-auto text-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mt-2">
            Dreams Estate
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Explore a wide range of tools and features designed to make buying,
            selling, and discovering properties easier than ever. Fully
            responsive, user-friendly, and optimized for the latest web
            standards.
          </p>
        </div>
        <h2 className="flex-2  text-9xl font-bold">150+</h2>
      </div>

      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={false}
        className="mt-20"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-800 px-4 py-2 mx-3 rounded-xl shadow-md cursor-pointer"
          >
            <feature.icon className="w-6 h-6 text-gray-300" />
            <span className="text-gray-200 text-sm font-medium p-5">
              {feature.text}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
