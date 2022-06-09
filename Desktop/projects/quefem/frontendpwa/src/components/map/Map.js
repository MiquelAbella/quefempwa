/*eslint import/no-webpack-loader-syntax: off*/
import React, { useRef, useEffect, useState } from "react";

// @ts-ignore
import mapboxgl from "!mapbox-gl";

import { useNavigate, Link } from "react-router-dom";
import styles from "./Map.module.css";
import addButton from "../../assets/addButton.png";

export const Map = ({
  eventsList,
  setCurrentEvent,
  user,
  filter,
  dateFilter,
  currentEvent,
  initialZoom,
  setInitialZoom,
  filteredEvents,
}) => {
  const navigate = useNavigate();
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlrZWJlZWdhciIsImEiOiJja3c1NXJ1bm0wNDZtMnZsNWZyemI2MDNhIn0.bUNhmu4ASbT7GIb25uExSw";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(() => {
    if (currentEvent) {
      return currentEvent.coordinates.lat;
    } else {
      return 0.6292;
    }
  });
  const [lat, setLat] = useState(() => {
    if (currentEvent) {
      return currentEvent.coordinates.lng;
    } else {
      return 41.6173;
    }
  });
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    return () => {
      setInitialZoom(map.current.getZoom());
    };
  }, []);

  useEffect(() => {
    if (filter !== "Tots" || dateFilter !== Infinity) {
      map.current.remove();
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    }
  }, [filter, dateFilter]);

  useEffect(() => {
    filteredEvents.map((event) => {
      new mapboxgl.Marker({ color: "#4dabf7" })
        .setLngLat([
          event.coordinates.lat + Math.floor(Math.random() * 1000) / 8500000,
          event.coordinates.lng + Math.floor(Math.random() * 1000) / 8500000,
        ])
        .addTo(map.current)
        .getElement()
        .addEventListener("click", () => {
          setCurrentEvent(event);
          navigate(`/event/${event._id}`, { replace: true });
        });
    });
  }, [map.current, filteredEvents]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

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
