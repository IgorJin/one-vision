import React, { FC, useState } from 'react'
import GoogleMapReact from 'google-map-react';

interface CenterPoint {
  lat: number;
  lng: number;
}

const Map = () => {
  const [center, setCenter] = useState<CenterPoint>({ lat: 59.955413, lng: 30.337844 })
  const [zoom, setZoom] = useState<number>(11)

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCHe4_1lGvi7Mp8OzWOBIo_wynsMjh3GFM" }}
        defaultCenter={center}
        defaultZoom={zoom}
      />
    </div>
  )
}

export default Map