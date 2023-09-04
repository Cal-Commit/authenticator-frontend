import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter basename="/">
        <AuthContextProvider>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <App />
          </GoogleOAuthProvider>
        </AuthContextProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
