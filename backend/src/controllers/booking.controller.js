import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { User } from "../models/User.js";
import Movie from "../models/Movies.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createBooking = asyncHandler(async (req, res) => {
  const {
    movie: movieId,
    user: userId,
    showingDate,
    seats,
    ticketPrice,
    orderId,
    paymentId
  } = req.body;

  if (!movieId || !userId || !showingDate || !seats || !Array.isArray(seats) || !orderId || !paymentId) {
    throw new ApiError(400, "Missing required booking information");
  }

  if (ticketPrice <= 0 || typeof ticketPrice !== "number") {
    throw new ApiError(400, "Invalid ticket price");
  }

  // Verify the order status
  const order = await razorpay.orders.fetch(orderId);
  if (order.status !== 'paid') {
    throw new ApiError(400, "Payment not completed");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const movie = await Movie.findById(movieId).session(session);
    if (!movie) throw new ApiError(404, "Movie not found");

    const showing = movie.showings.find(
      (s) =>
        s.date.toISOString().split("T")[0] === new Date(showingDate).toISOString().split("T")[0]
    );
    if (!showing) throw new ApiError(400, "Invalid showing date");

    let availableSeats = showing.availableSeats;
    const bookedSeats = [];
console.log(showing)
    for (const seatNumber of seats) {
      console.log(`Checking availability of seat: ${seatNumber}`);
      console.log("Available seats:", availableSeats);

      const seat = availableSeats.find(
        (s) => s.seatNumber === seatNumber && !s.isBooked
      );
      if (!seat) {
        console.log(`Seat ${seatNumber} is already booked or does not exist.`);
        throw new ApiError(400, `Seat ${seatNumber} is not available`);
      }

      bookedSeats.push(seatNumber);
    }

    const totalPrice = ticketPrice;

    const updatedMovie = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        "showings._id": showing._id,
        "showings.availableSeats.seatNumber": { $all: bookedSeats },
      },
      {
        $set: {
          "showings.$.availableSeats.$[seat].isBooked": true,
        },
      },
      {
        new: true,
        session,
        arrayFilters: [{ "seat.seatNumber": { $in: bookedSeats } }],
      }
    );

    if (!updatedMovie) {
      throw new ApiError(
        409,
        "Seats are no longer available (concurrency issue)",
      );
    }

    const booking = new Booking({
      movie: movieId,
      user: userId,
      showingDate,
      seats: bookedSeats,
      totalPrice,
      showingId: showing._id,
      orderId,
      paymentId,
      paymentStatus: 'paid'
    });

    await booking.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating booking:", error);
    throw new ApiError(500, `Failed to create booking: ${error.message}`);
  } finally {
    session.endSession();
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  res.status(200).json({ message: "Booking deleted successfully" });
});

export { deleteBooking, createBooking };
