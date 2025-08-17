import React from "react";
import Banner from "../Banner/Banner";
import LatestUserReviews from "../../Components/LatestUserReviews/LatestUserReviews";
import FeatureGrid from "../../Components/FeatureGrid/FeatureGrid";
import PropertyFeatures from "../../Components/PluginCompatibility/PluginCompatibility";
import NewPropertiesSection from "../../Components/NewPropertiesSection/NewPropertiesSection";
import ElementsSection from "../../Components/ElementsSection/ElementsSection";
import LatestBlog from "../../Components/LatestBlog/LatestBlog";


const Home = () => {
  return (
    <div>
      <Banner />
      <NewPropertiesSection/>
      <LatestBlog/>
      <FeatureGrid/>
      <PropertyFeatures/>
      <ElementsSection/>
      <LatestUserReviews/>
    </div>
  );
};

export default Home;
