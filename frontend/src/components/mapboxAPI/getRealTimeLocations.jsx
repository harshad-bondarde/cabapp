import { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { CircleX } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../App.css';
import { setPathCoordinates, setShowMap } from "../../store/mapSlice";
import { useDispatch ,useSelector} from "react-redux";
import { setMapCoordinates } from "../../store/mapSlice";

function GetRealTimeLocations({INITIAL_ZOOM}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const location=useSelector(state=>state.map.coordinates)
  const pathCoordinates=useSelector(state=>state.map.pathCoordinates)
  console.log(pathCoordinates)
  const [center, setCenter] = useState([location.longitude,location.latitude]);
  
  const dispatch=useDispatch()

  
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
    
    // if(!location)
    //   setCenter([pathCoordinates[0].coordinates.longitude,pathCoordinates[0].coordinates.latitude])
    const pathCenter = pathCoordinates?.[0]?.coordinates
      ? [pathCoordinates[0].coordinates.longitude, pathCoordinates[0].coordinates.latitude]
      : [0, 0];

    const mapCenter = location && location.longitude && location.latitude
      ? [location.longitude, location.latitude]
      : pathCenter;
      
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center:mapCenter,
      zoom: zoom
    });

    if(Object.keys(location).length>0){
      const marker = new mapboxgl.Marker()
      .setLngLat(center)
      .addTo(mapRef.current);
    }else{
      pathCoordinates.forEach(point => {
        new mapboxgl.Marker()
        .setLngLat([point.coordinates.longitude,point.coordinates.latitude])
        .addTo(mapRef.current)
      });
    }

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
                  dispatch(setPathCoordinates([]))
                }}/>
            </div>
            </div>
      <div id="map-container" className="border-8 m-2 rounded-3xl"  ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
          
      </div>
    </div>
  );
}

export default GetRealTimeLocations;

