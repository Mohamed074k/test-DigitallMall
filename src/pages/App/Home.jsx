import React from 'react'
import Hero from "../../components/APP_COMPONENTS/homeComponents/Hero";
import TopCategories from "../../components/APP_COMPONENTS/homeComponents/Topcategories";
import TopBrands from "../../components/APP_COMPONENTS/homeComponents/TopBrands";
import SectionToggle from "../../components/APP_COMPONENTS/homeComponents/SectionToggle";

const Home = () => {
  return (
         <>
          <Hero />
          <TopCategories />
          <TopBrands />
          <SectionToggle />
          </>
  )
}

export default Home