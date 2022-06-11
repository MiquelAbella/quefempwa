/*eslint import/no-webpack-loader-syntax: off*/
import React, { useState, useRef, useEffect } from "react";
// import ReactMapGl, { Marker } from "!react-map-gl";
// @ts-ignore
import mapboxgl from "!mapbox-gl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./AddEvent.module.css";
import axios from "axios";

export const AddEvent = ({ user, setEventsList, eventsList }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    place: "",
    date: "",
    start: "",
    end: "",
    price: "",
    description: "",
    category: "concerts",
    image: null,
    location: user?.location || "",
    saveLocation: user?.saveLocation || false,
  });

  const [location, setLocation] = useState([]);
  const [isAddLoading, setIsAddLoading] = useState(false);

  let navigate = useNavigate();

  const handleSaveLocation = (e) => {
    if (formValues.saveLocation === false) {
      setFormValues({
        ...formValues,
        saveLocation: true,
      });
    } else {
      setFormValues({
        ...formValues,
        saveLocation: false,
      });
    }
  };

  const handleFormChange = (e) => {
    if (e.target.id === "upload-img") {
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const submitForm = async (e) => {
    setIsAddLoading(true);
    e.preventDefault();
    if (!Object.values(formValues).filter((val) => val === "").length) {
      const formData = new FormData();
      formData.append("file", formValues.image);
      formData.append("upload_preset", "pgckkypy");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dfjelhshb/image/upload/",
          formData
        )
        .then((res) => (formValues.image = res.data.url));

      axios
        .post("https://quefem.herokuapp.com/createEvent", {
          formValues,
          user: user.uid,
        })
        .then((res) => {
          setEventsList([...eventsList, res.data.event]);
          setIsAddLoading(false);
          navigate("/", { replace: true });
        });
    } else {
      Swal.fire("Omple tots els camps", "", "info");
      setIsAddLoading(false);
    }
  };

  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlrZWJlZWdhciIsImEiOiJja3c1NXJ1bm0wNDZtMnZsNWZyemI2MDNhIn0.bUNhmu4ASbT7GIb25uExSw";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0.6292);
  const [lat, setLat] = useState(41.6173);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (location.length) {
      setFormValues({ ...formValues, location: location });
    }
  }, [location]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", (e) => {
      setLocation([e.lngLat.lat, e.lngLat.lng]);

      if (map.current._markers.length) {
        map.current._markers.map((marker) => {
          marker.remove();
        });
      }

      let marker = new mapboxgl.Marker({ color: "#4dabf7" });
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.current);
    });
  }, []);

  return (
    <div className={styles.addEvent}>
      <form className={styles.form} onSubmit={submitForm}>
        <input
          onChange={handleFormChange}
          name="title"
          value={formValues.title}
          className={styles.input}
          type="text"
          placeholder="Títol"
        />
        <div className={styles.inputGroup}>
          <input
            onChange={handleFormChange}
            name="place"
            value={formValues.place}
            className={styles.input}
            type="text"
            placeholder="Adreça"
          />
        </div>
        <input
          onChange={handleFormChange}
          name="date"
          value={formValues.date}
          className={styles.input}
          type="date"
          placeholder="Dia"
        />
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="inici">
            Inici
          </label>
          <input
            onChange={handleFormChange}
            name="start"
            value={formValues.start}
            className={styles.input}
            type="time"
            placeholder="Hora inici"
            id="inici"
          />
        </div>
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="final">
            final
          </label>
          <input
            onChange={handleFormChange}
            name="end"
            value={formValues.end}
            className={styles.input}
            type="time"
            placeholder="Hora fi"
            id="final"
          />
        </div>
        <input
          onChange={handleFormChange}
          name="price"
          value={formValues.price}
          className={styles.input}
          type="text"
          placeholder="Preu"
        />
        <textarea
          name="description"
          onChange={handleFormChange}
          value={formValues.description}
          className={styles.textarea}
          placeholder="descripció"
        />
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="category">
            Categoría
          </label>
          <select
            onChange={handleFormChange}
            className={styles.category}
            id="category"
            name="category"
          >
            <option value="concerts">Concerts</option>
            <option value="teatre">Teatre</option>
            <option value="festa">Festa</option>
            <option value="altres">Altres</option>
          </select>
        </div>
        <input
          type="file"
          id="upload-img"
          onChange={handleFormChange}
          name="image"
        />
        <p className={styles.imageMsg}>
          *Si la imatge no és quadrada, es retallarà.
        </p>
        <div className={styles.mapGroup}>
          <p>Clica al mapa per afegir la ubicació</p>

          <div>
            <div
              style={{ height: "40vh", width: "80vw", marginTop: "5vh" }}
              ref={mapContainer}
              className="map-container"
            />
          </div>
        </div>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="cbox"
            value={formValues.saveLocation}
            onChange={handleSaveLocation}
          />
          <label htmlFor="cbox">Guardar ubicació per futurs events</label>
        </div>
        {!isAddLoading ? (
          <button type="submit">Afegeix</button>
        ) : (
          <p>Afegint...</p>
        )}
      </form>
    </div>
  );
};
