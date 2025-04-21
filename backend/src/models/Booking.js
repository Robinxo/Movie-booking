import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movies",
      required: true,
      description: "The ID of the movie being booked.",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      description: "The ID of the user who made the booking.",
    },

    showingDate: {
      type: Date,
      required: true,
      description: "The date and time of the booking.",
    },
    seats: [
      {
        type: Number,
        required: true,
        min: 1,
        unique: true,
        description: "The seat number assigned for the booking.",
      },
    ],
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      description: "The total price of the booking.",
    },
    showingId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Showing",
      description: "the id of the showing from the movie document.",
    },
    orderId: {
      type: String,
      required: true,
      description: "The Razorpay order ID for this booking.",
    },
    paymentId: {
      type: String,
      required: true,
      description: "The Razorpay payment ID for this booking.",
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      description: "The status of the payment for this booking.",
    }
  },
  {
    timestamps: true,
  },
);
const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
