import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import "./utils/fixLeafletIcon";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { WeatherProvider } from "./context/WeatherContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SettingsProvider } from "./context/SettingsContext";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WeatherProvider>
          <FavoriteProvider>
            <NotificationProvider>
              <SettingsProvider>
                <LanguageProvider>
                  <Toaster position="top-right" />
                  <App />
                </LanguageProvider>
              </SettingsProvider>
            </NotificationProvider>
          </FavoriteProvider>
        </WeatherProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
