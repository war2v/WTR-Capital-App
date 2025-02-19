import {  MarkerF, OverlayView } from "@react-google-maps/api";
import { useState } from "react";
import MarkerItem from "./MarkerItem";

const PropMarker = ({item}) => {
    const [selectedListing, setSelectedListing] = useState();
    const closeHandler = () => {
        setSelectedListing(null)
    } 
    return ( 
        <div>
            <MarkerF
                position={item.coordinates}
                onClick={() => setSelectedListing(item)}
            >
                {selectedListing&&
                 <OverlayView
                    position={selectedListing.coordinates}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <MarkerItem closeHandler={closeHandler}  item={selectedListing}/>
                </OverlayView>
}
            </MarkerF>
        </div>
     );
}
 
export default PropMarker;