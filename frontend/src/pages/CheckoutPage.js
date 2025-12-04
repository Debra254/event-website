import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_public_key_here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    
    try {
      const res = await fetch('http://localhost:3001/payment/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ amount: getTotal() * 100 })
      });
      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        alert('Payment successful!');
        clearCart();
      }
    } catch (err) {
      alert('Payment failed');
    }
    
    setProcessing(false);
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth: '500px', margin: '50px auto'}}>
        <h2>Checkout</h2>
        <div style={{marginBottom: '20px'}}>
          <h3>Order Summary</h3>
          {cart.map((item, index) => (
            <div key={index} style={{padding: '10px 0', borderBottom: '1px solid #333'}}>
              {item.title} - ${item.ticket_price}
            </div>
          ))}
          <div className="total">Total: ${getTotal()}</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{padding: '20px', background: '#333', borderRadius: '4px', marginBottom: '20px'}}>
            <CardElement />
          </div>
          <button 
            type="submit" 
            disabled={!stripe || processing} 
            className="btn"
            style={{width: '100%'}}
          >
            {processing ? 'Processing...' : `Pay $${getTotal()}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;