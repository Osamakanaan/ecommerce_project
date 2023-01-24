import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useEffect } from 'react';
export const client = sanityClient({
  projectId: '33gvjpsz',  
  dataset: 'production',
  apiVersion: '2022-12-23',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});


const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);