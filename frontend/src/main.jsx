import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={5000}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>
);
