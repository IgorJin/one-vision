import React, { FC, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const Location = () => {
  const [center, setCenter] = useState<number[]>([59.955413, 30.337844]);
  const [zoom, setZoom] = useState<number>(11);

  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const coordinates = [center];

  return (
    <React.Fragment>
      <h2 className="title">Карта</h2>

      <div style={{ height: "100vh", width: "100%" }}>
        <YMaps>
          <Map defaultState={{ center, zoom}}>
            {coordinates.map((coordinate, id) => (
              <Placemark geometry={coordinate} key={id} />
            ))}
          </Map>
        </YMaps>
      </div>
    </React.Fragment>
  );
};

export default Location;
