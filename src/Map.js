import React from 'react'
import './Map.css';
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import {showDataOnMap} from './util';

function Map({casesType, countries,  center, zoom}) {
    console.log(casesType)
    function ChangeMap({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    
    return (
        <div className="map">
            {/* <LeafletMap center={center} zoom={zoom}> */}
            <LeafletMap >
                <ChangeMap center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Loop through countries and draw circles on the screen */}

                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
