import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_EVENT } from "../utils/mutations";
import { saveEventIds, getSavedEventIds } from "../utils/localStorage";

import Auth from "../utils/auth";

const SearchEvents = () => {
  // create state for holding returned google api data
  const [searchedEvents, setSearchedEvents] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved eventId values
  const [savedEventIds, setsavedEventIds] = useState(getSavedEventIds());

  const [saveEvent, { error }] = useMutation(SAVE_EVENT);

  // set up useEffect hook to save `savedEventIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveEventIds(savedEventIds);
  });

  // create method to search for events and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/events/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const eventData = items.map((event) => ({
        eventId: event.id,
        authors: event.volumeInfo.authors || ["No author to display"],
        title: event.volumeInfo.title,
        description: event.volumeInfo.description,
      }));

      setSearchedEvents(eventData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a event to our database
  const handleSaveEvent = async (eventId) => {
    // find the event in `searchedEvents` state by the matching id
    const eventToSave = searchedEvents.find(
      (event) => event.eventId === eventId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { eventData } = await saveEvent({
        variables: { eventData: { ...eventToSave } },
      });
      console.log(savedEventIds);
      setsavedEventIds([...savedEventIds, eventToSave.eventId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for events!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for any event "
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Search 🌎
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedEvents.length
            ? `Viewing ${searchedEvents.length} results:`
            : " 📍Search for a event to begin"}
        </h2>
        <CardColumns>
          {searchedEvents.map((event) => {
            return (
              <Card key={event.eventId} border="dark">
                {event.image ? (
                  <Card.Img
                    src={event.image}
                    alt={`The cover for ${event.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <p className="small">Authors: {event.authors}</p>
                  <Card.Text>{event.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedEventIds?.some(
                        (savedId) => savedId === event.eventId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveEvent(event.eventId)}
                    >
                      {savedEventIds?.some(
                        (savedId) => savedId === event.eventId
                      )
                        ? "Evfent Already Saved!"
                        : "Save This Event!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchEvents;
