import { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { CircleX } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../App.css';
import { setShowMap } from "../../store/mapSlice";
import { useDispatch ,useSelector} from "react-redux";
import { setMapCoordinates } from "../../store/mapSlice";

function GetRealTimeLocations({INITIAL_ZOOM}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const location=useSelector(state=>state.map.coordinates)
  const dispatch=useDispatch()

  console.log(location)
  const [center, setCenter] = useState([location.longitude,location.latitude]);
  useEffect(() => {
    setCenter([location.longitude, location.latitude]);
  }, [location]);
  console.log(center)
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: [location.longitude,location.latitude],
      zoom: INITIAL_ZOOM
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
    

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom
    });

    const marker = new mapboxgl.Marker()
    .setLngLat(center)
    .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    }
  }, [center]);
  return (
    <div className="w-full h-screen ">
            <div className="flex justify-center m-2 ">
              <div className="cursor-pointer">
                <CircleX onClick={()=>{
                  dispatch(setShowMap(false))
                  dispatch(setMapCoordinates({}))
                }}/>
            </div>
            </div>
      <div id="map-container" className="border-8 m-2 rounded-3xl"  ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
          
      </div>
    </div>
  );
}

export default GetRealTimeLocations;

