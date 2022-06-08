/*eslint import/no-webpack-loader-syntax: off*/
import React, { useRef, useEffect, useState } from "react";

// // @ts-ignore
// import ReactMapGl, { Marker } from "!react-map-gl";

// @ts-ignore
import mapboxgl from "!mapbox-gl";

import { useNavigate, Link } from "react-router-dom";
import styles from "./Map.module.css";
import addButton from "../../assets/addButton.png";

export const Map = ({ eventsList, setCurrentEvent, user }) => {
  const navigate = useNavigate();
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlrZWJlZWdhciIsImEiOiJja3c1NXJ1bm0wNDZtMnZsNWZyemI2MDNhIn0.bUNhmu4ASbT7GIb25uExSw";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0.6292);
  const [lat, setLat] = useState(41.6173);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    eventsList.map((event) => {
      new mapboxgl.Marker({ color: "#4dabf7" })
        .setLngLat([event.coordinates.lat, event.coordinates.lng])
        .addTo(map.current)
        .getElement()
        .addEventListener("click", () => {
          setCurrentEvent(event);
          navigate(`/event/${event._id}`, { replace: true });
        });
    });
  }, [map.current]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  //
  // const [isMounted, setIsMounted] = useState(false);
  // const viewport = useRef({
  //   latitude: 41.6173,
  //   longitude: 0.6292,
  //   zoom: 11,
  //   height: "80vh",
  //   width: "80vw",
  // });

  // useEffect(() => {
  //   setIsMounted(!isMounted);
  // }, []);

  return (
    <div>
      <div>
        <div
          style={{ height: "80vh", width: "80vw", marginTop: "5vh" }}
          ref={mapContainer}
          className="map-container"
        />
      </div>

      {user ? (
        <Link className={styles.addButton} to="/afegir">
          <img alt="" className={styles.addButtonImg} src={addButton} />
        </Link>
      ) : null}
    </div>
  );
};
