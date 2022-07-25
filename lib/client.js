//for sanity client

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// create a sanity client
export const client = sanityClient({
    projectId: 'wmnp67kb',
    dataset: 'production',
    apiVersion:'2022-07-21',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
}); 

//to be able to use sanity image
const builder = imageUrlBuilder(client);

//sanity gives us access to the image url 
//get access to the url 
export const urlFor = (source) => builder.image(source);