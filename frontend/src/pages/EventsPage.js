import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> ${event.ticket_price}</p>
            <p><strong>Available:</strong> {event.available_tickets} tickets</p>
            <Link to={`/event/${event._id}`} className="btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;