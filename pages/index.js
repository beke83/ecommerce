import React from 'react';
//import all components from the index.js file
import {Product, FooterBanner, HeroBanner } from '../components';
import { client } from '../lib/client';

const Home = ({products, bannerData}) => {
  return (
    <>
    <HeroBanner heroBanner={bannerData.length &&  bannerData[0]}/>
    <div className="products-heading">
     <h2>Best Selling Products</h2>
     <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
    {products?.map((product) => <Product key={product._id} product={product} /> )}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

//for fetching data
//it return json
export const getServerSideProps = async () => {
  // a sanity query
  // '*': meaning to fetch all
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  //returns an object that has a props obejct that we pass the product and bannerData
  return {
    props: {products, bannerData},
  }
}

export default Home

