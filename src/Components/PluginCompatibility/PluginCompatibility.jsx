import React from "react";

// Sample icons (replace with real icons or image paths)
const propertyFeatures = [
  { name: "Verified Listings", icon: "✅" },
  { name: "Map View", icon: "🗺️" },
  { name: "360° Virtual Tour", icon: "🎥" },
  { name: "Mortgage Calculator", icon: "📊" },
  { name: "Property Comparison", icon: "📋" },
  { name: "Nearby Schools", icon: "🏫" },
  { name: "Agent Contact", icon: "📞" },
  { name: "Save Favorites", icon: "❤️" },
  { name: "Instant Alerts", icon: "🔔" },
  { name: "Floor Plans", icon: "📐" },
  { name: "Price History", icon: "📈" },
  { name: "Legal Check", icon: "📄" },
];

const PropertyFeatures = () => {
  return (
    <div className="bg-blue-50 p-8 rounded-xl max-w-7xl mx-auto my-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Grid of features */}
        <div className="grid grid-cols-3 gap-4">
          {propertyFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm font-medium text-gray-700">{feature.name}</p>
            </div>
          ))}
        </div>

        {/* Text section */}
        <div>
          <h4 className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <span>🏘️</span> Property Tools
          </h4>
          <h2 className="text-2xl font-bold mt-2 mb-4">Smart Features for Real Estate</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Our platform includes all the essential features buyers and agents expect:
            verified listings, 360° tours, map views, pricing history, and more. Whether you're
            searching or selling, enjoy seamless real estate experiences with the best tools
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyFeatures;
