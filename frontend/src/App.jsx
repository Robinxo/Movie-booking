import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth.jsx";
import AdminProfile from "./Profile/AdminProfile.jsx";
import UserProfile from "./Profile/UserProfile";
import Admin from "./components/Admin/Admin";
import Header from "./components/Headers.jsx";
import "./App.css";
import Homepage from "./components/Homepage.jsx";
import Movies from "./components/Movies/Movies.jsx";
import AddMovies from "./components/Movies/AddMovie.jsx";
import Booking from "./components/Bookings/Booking.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header />
        <section>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add" element={<AddMovies />} />
            <Route path="/admin" element={<AdminProfile />} />
            <Route path="/adminLogin" element={<Admin />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default App;
