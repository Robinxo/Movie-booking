import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movies/getMovies").catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("No data");
  }
  const data = await res.data;
  return data;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/users/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  console.log(resData);

  return resData;
};

export const sendUserAuthRequest = async (authData, signup) => {
  try {
    console.log("Sending request with data:", authData);

    const response = await axios.post(
      `/users/${signup ? "signup" : "login"}`,
      {
        username: signup ? authData.username : "",
        email: authData.email,
        password: authData.password,
      },
      { withCredentials: true },
    );

    console.log("API Response:", response);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    // Ensure the token is included in the response
    if (response.data.token) {
      console.log("Token received in response:", response.data.token);
    } else {
      console.warn("No token received in response");
    }

    return response.data; // ✅ Ensure valid data is returned
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    return null; // Return null if there's an error
  }
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movies/add",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        actors: data.actors,
        showings: data.showings,
        ticketPrice: data.ticketPrice,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getMoviedetails = async (id) => {
  const res = await axios.get(`/movies/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteMovie = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const res = await axios.delete("/movies/delete", {
      // URL without title
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        // Send the title in the request body
        title: data.title,
      },
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const response = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    }, {
      withCredentials: true
    });

    console.log("Admin API Response:", response);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    // Ensure the token is included in the response
    if (response.data.token) {
      console.log("Admin token received in response:", response.data.token);
    } else {
      console.warn("No admin token received in response");
    }

    return response.data;
  } catch (error) {
    console.error("Admin API Request Error:", error.response?.data || error.message);
    return null;
  }
};

export const newBooking = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const res = await axios.post("/bookings/bookMovie", {
      movie: data.movie,
      user: data.user,
      showingDate: data.showingDate,
      seats: data.seats,
      ticketPrice: data.ticketPrice,
      orderId: data.orderId,
      paymentId: data.paymentId
    }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Booking API Response:", res);
    return res.data;
  } catch (err) {
    console.error("Error in newBooking API call:", err.response?.data || err.message);
    throw err;
  }
};

export const getUserBooking = async () => {
  try {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    
    const res = await axios.get(`/users/bookings/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => console.log(err));
    
    if (res.status !== 201) {
      return console.log("Unexpected error");
    }
    const resData = await res.data;
    console.log(resData);
    console.log(resData.bookings._id);
    return resData;
  } catch (err) {
    console.error("Error in getUserBooking:", err);
    throw err;
  }
};

export const deleteBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    
    const res = await axios.delete(`/bookings/deleteBooking/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => {
      console.log(err);
    });
    
    if (res.status !== 200) {
      console.log("unexpected error");
    }
    const resData = await res.data;
    return resData;
  } catch (err) {
    console.error("Error in deleteBooking:", err);
    throw err;
  }
};
