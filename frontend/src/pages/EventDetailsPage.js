import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!localStorage.getItem('token')) {
      alert('Please login to purchase tickets');
      return;
    }
    addToCart(event);
    alert('Ticket added to cart!');
  };

  if (!event) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.ticket_price}</p>
        <p><strong>Available Tickets:</strong> {event.available_tickets}</p>
        <button onClick={handleAddToCart} className="btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default EventDetailsPage;