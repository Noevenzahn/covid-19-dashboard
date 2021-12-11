import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

const WorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false
});

export default function Home() {

  return (
    <WorldMap />
  )
} 
