import React from "react";
import Banner from "../Banner/Banner";
import LatestUserReviews from "../../Components/LatestUserReviews/LatestUserReviews";
import FeatureGrid from "../../Components/FeatureGrid/FeatureGrid";
import PropertyFeatures from "../../Components/PluginCompatibility/PluginCompatibility";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureGrid/>
      <PropertyFeatures/>
      <LatestUserReviews/>
    </div>
  );
};

export default Home;
