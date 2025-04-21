import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { createRazorpayOrder, initializePayment } from '../Api-helper/payment-helpers';

const PaymentButton = ({ 
  amount, 
  movieTitle, 
  showingDate, 
  seats, 
  onPaymentSuccess, 
  onPaymentFailure 
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Create Razorpay order
      const orderData = await createRazorpayOrder(
        amount,
        movieTitle,
        showingDate,
        seats
      );

      // Initialize Razorpay payment
      await initializePayment(
        orderData,
        (paymentResponse) => {
          onPaymentSuccess(paymentResponse);
        },
        (error) => {
          onPaymentFailure(error);
        }
      );
    } catch (error) {
      console.error('Payment initialization failed:', error);
      onPaymentFailure('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handlePayment}
      disabled={loading}
      fullWidth
      sx={{ mt: 2 }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        'Proceed to Payment'
      )}
    </Button>
  );
};

export default PaymentButton; 