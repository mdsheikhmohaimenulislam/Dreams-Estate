import React from "react";

const FeatureGrid = () => {
const features = [
  {
    icon: "🤍",
    title: "Favorite Properties",
    description:
      "Visitors can save their favorite homes. These show up in a list inside their user dashboard. From there, it’s easy to view or manage them anytime.",
  },
  {
    icon: "📩",
    title: "Save Search & Email Alert",
    description:
      "Visitors can save their searches and get email alerts when new homes are added. They can also delete saved searches anytime from their user dashboard.",
  },
  {
    icon: "📨",
    title: "Instant Messages Inbox",
    description:
      "Users can send private messages to agents and reply fast. All messages are saved in the user dashboard, so past conversations are easy to find.",
  },
  {
    icon: "📥",
    title: "Submit Properties",
    description:
      "You can allow front end submissions, and fully manage the submit form fields and mandatory fields. Add your own custom fields and they sync with the front submission too.",
  },
  {
    icon: "🗂️",
    title: "Manage Properties",
    description:
      "Your users can disable or enable a published property, delete a listing or edit it at any time. It’s also easy to find a specific property using a dedicated search tool.",
  },
  {
    icon: "👤",
    title: "User Types",
    description:
      "Admins can choose which user roles are active. When enabled, visitors can sign up as users, agents, developers, or agencies. Each role can be approved manually.",
  },
  {
    icon: "💳",
    title: "WooCommerce Payments",
    description:
      "The theme works with the most popular payment gateways, Stripe, and Paypal. For those who wish to have Wire Transfer (offline payment), we support that as well.",
  },
  {
    icon: "📆",
    title: "Membership Submission",
    description:
      "Admins can create membership plans for each user type. Each plan can include a set number of listings, featured properties, and a time limit in days, weeks, months, or years.",
  },
  {
    icon: "💰",
    title: "Paid Submission",
    description:
      "Admins can let users pay per listing. Before posting a property, users must pay a fee. An extra fee can be added to make the property featured.",
  },
];


  return (
    <div className="grid md:grid-cols-3 w-11/12 mx-auto mt-20 gap-6 px-4 py-8">
      {features.map((feature, idx) => (
        <div key={idx} className="space-y-2 bg-base-300 p-5  rounded-xl">
          <div className="text-2xl">{feature.icon}</div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
