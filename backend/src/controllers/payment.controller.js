import Razorpay from 'razorpay';
import "dotenv/config";

// Log Razorpay credentials (without showing the actual values)
console.log('Razorpay Key ID exists:', !!process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
  try {
    const { amount, movieTitle, showingDate, seats } = req.body;
    
    console.log('Creating order with data:', { 
      amount, 
      movieTitle, 
      showingDate, 
      seats: seats.length 
    });

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `booking_${Date.now()}`,
      notes: {
        movieTitle,
        showingDate,
        seats: JSON.stringify(seats)
      }
    });

    console.log('Order created successfully:', order.id);

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating order:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    console.log('Verifying payment:', { 
      orderId: razorpay_order_id, 
      paymentId: razorpay_payment_id 
    });

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const crypto = await import('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment is successful
      console.log('Payment verified successfully');
      res.status(200).json({
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      console.log('Payment verification failed: Invalid signature');
      res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ 
      error: 'Failed to verify payment',
      message: error.message
    });
  }
}; 