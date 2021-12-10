import dynamic from 'next/dynamic';
import Head from 'next/head';

const WorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false
});

export default function Home() {
  
  return (
    <>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <WorldMap />
    </>
  )
} 
