import React from "react";
import Banner from "../Banner/Banner";
import LatestUserReviews from "../../Components/LatestUserReviews/LatestUserReviews";
import FeatureGrid from "../../Components/FeatureGrid/FeatureGrid";
import PropertyFeatures from "../../Components/PluginCompatibility/PluginCompatibility";
import NewPropertiesSection from "../../Components/NewPropertiesSection/NewPropertiesSection";
import ElementsSection from "../../Components/ElementsSection/ElementsSection";


const Home = () => {
  return (
    <div>
      <Banner />
      <NewPropertiesSection/>
      <FeatureGrid/>
      <PropertyFeatures/>
      <ElementsSection/>
      <LatestUserReviews/>
    </div>
  );
};

export default Home;
