import api from './axios-config';

// Load Razorpay script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create Razorpay order
export const createRazorpayOrder = async (amount, movieTitle, showingDate, seats) => {
  try {
    console.log('Creating Razorpay order with data:', {
      amount,
      movieTitle,
      showingDate,
      seats
    });
    
    const response = await api.post('/payments/create-order', {
      amount,
      movieTitle,
      showingDate,
      seats
    });
    
    console.log('Razorpay order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    console.log('Verifying payment with data:', {
      orderId,
      paymentId
    });
    
    const response = await api.post('/payments/verify-payment', {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature
    });
    
    console.log('Payment verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

// Initialize Razorpay payment
export const initializePayment = async (orderData, onSuccess, onFailure) => {
  const res = await loadRazorpay();
  if (!res) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    return;
  }

  console.log('Initializing Razorpay payment with order data:', {
    orderId: orderData.orderId,
    amount: orderData.amount,
    currency: orderData.currency
  });

  const options = {
    key: orderData.keyId,
    amount: orderData.amount,
    currency: orderData.currency,
    name: 'Movie Booking',
    description: 'Movie Ticket Booking',
    order_id: orderData.orderId,
    handler: async (response) => {
      try {
        console.log('Payment handler called with response:', response);
        
        // Verify payment
        const verificationResponse = await verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );

        if (verificationResponse.success) {
          console.log('Payment verified successfully');
          onSuccess({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id
          });
        } else {
          console.error('Payment verification failed');
          onFailure('Payment verification failed');
        }
      } catch (error) {
        console.error('Error in payment handler:', error);
        onFailure('Payment verification failed');
      }
    },
    prefill: {
      name: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || ''
    },
    theme: {
      color: '#3399cc'
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}; 