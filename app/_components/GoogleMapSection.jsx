import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import PropMarker from './PropMarker';

const containerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius:8,
  }
  
 
const GoogleMapSection = ({coordinates, listing}) => {
   
      
    const [center, setCenter] = useState({
        lat: 35.517,
        lng: -86.580,
    });
      const [map, setMap] = React.useState(null)
    
      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        setMap(map)
       
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

      useEffect(() => {
        coordinates&&setCenter(coordinates);
        console.log(coordinates)
      }, [coordinates])

     return (
    <div className=''>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
            >
            {/* Child components, such as markers, info windows, etc. */}
            {listing?.map((item, index) => (
                <PropMarker 
                    key={index}
                    item={item}
                />
            ))}
            </GoogleMap>
    </div>
  ) 
}
export default React.memo(GoogleMapSection);