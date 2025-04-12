import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux"; // ✅ Import Provider from react-redux
import App from "./App.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Set the base URL for axios requests
axios.defaults.withCredentials = true; // Enable sending cookies with requests

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ Wrap App with BrowserRouter */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
