import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/main/Main";
import { Nav } from "./components/nav/Nav";
import { Map } from "./components/map/Map";
import { Login } from "./components/login/Login";
import { AddEvent } from "./components/addEvent/AddEvent";
import { UpdateEvent } from "./components/updateEvent/UpdateEvent";
import { EventInfo } from "./components/eventInfo/EventInfo";

function App() {
  const [user, setUser] = useState(null);
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [filter, setFilter] = useState("Tots");
  const [dateFilter, setDateFilter] = useState(Infinity);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [lastPage, setLastPage] = useState("/");
  const [isLoading, setIsLoading] = useState(true);
  const [initialZoom, setInitialZoom] = useState(9);

  useEffect(() => {
    let eventsToFilter = [...eventsList];
    setFilteredEvents(
      eventsToFilter.filter((evt) => {
        return filter === "Tots"
          ? new Date(evt.date).valueOf() < dateFilter
          : new Date(evt.date).valueOf() < dateFilter &&
              filter.toLowerCase() === evt.category;
      })
    );
  }, [filter, dateFilter, eventsList]);

  useEffect(() => {
    axios
      .get("https://quefem.herokuapp.com/getEvents")
      .then((res) => {
        if (res.data.ok) {
          setEventsList(
            res.data.events.sort((a, b) => {
              return (
                parseFloat(Date.parse(a.date)) - parseFloat(Date.parse(b.date))
              );
            })
          );
          setFilteredEvents(
            res.data.events.sort((a, b) => {
              return (
                parseFloat(Date.parse(a.date)) - parseFloat(Date.parse(b.date))
              );
            })
          );
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Nav
        setLastPage={setLastPage}
        user={user}
        setFilter={setFilter}
        setDateFilter={setDateFilter}
        setIsLoginShown={setIsLoginShown}
        setEventsList={setEventsList}
        eventsList={eventsList}
      />
      {isLoginShown && !user ? (
        <Login
          setUser={setUser}
          user={user}
          setIsLoginShown={setIsLoginShown}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            <Map
              filteredEvents={filteredEvents}
              initialZoom={initialZoom}
              setInitialZoom={setInitialZoom}
              currentEvent={currentEvent}
              filter={filter}
              dateFilter={dateFilter}
              eventsList={eventsList}
              setCurrentEvent={setCurrentEvent}
              user={user}
            />
          }
        >
          <Route
            path="/"
            element={
              <Map
                filteredEvents={filteredEvents}
                initialZoom={initialZoom}
                setInitialZoom={setInitialZoom}
                currentEvent={currentEvent}
                filter={filter}
                dateFilter={dateFilter}
                eventsList={eventsList}
                setCurrentEvent={setCurrentEvent}
                user={user}
              />
            }
          />
        </Route>
        <Route
          path="/events"
          element={
            <Main
              dateFilter={dateFilter}
              filter={filter}
              isLoading={isLoading}
              setEventToUpdate={setEventToUpdate}
              user={user}
              setCurrentEvent={setCurrentEvent}
              eventsList={eventsList}
              setEventsList={setEventsList}
            />
          }
        >
          <Route
            path="/events"
            element={
              <Main
                setEventToUpdate={setEventToUpdate}
                user={user}
                setCurrentEvent={setCurrentEvent}
              />
            }
          />
        </Route>
        <Route
          path="/afegir"
          element={
            <AddEvent
              user={user}
              setEventsList={setEventsList}
              eventsList={eventsList}
            />
          }
        >
          <Route
            path="/afegir"
            element={
              <AddEvent
                user={user}
                setEventsList={setEventsList}
                eventsList={eventsList}
              />
            }
          />
        </Route>
        <Route
          path="/edita"
          element={
            <UpdateEvent
              eventToUpdate={eventToUpdate}
              user={user}
              setEventsList={setEventsList}
              eventsList={eventsList}
            />
          }
        >
          <Route
            path="/edita"
            element={
              <UpdateEvent
                eventToUpdate={eventToUpdate}
                user={user}
                setEventsList={setEventsList}
                eventsList={eventsList}
              />
            }
          />
        </Route>
        <Route path="event">
          <Route
            path=":id"
            element={
              <EventInfo currentEvent={currentEvent} lastPage={lastPage} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
