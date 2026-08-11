import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../services/settingsApi";
import { useAuth } from "./AuthContext";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [settings, setSettings] = useState({
    theme: "system",
    temperatureUnit: "C",
    windSpeedUnit: "m/s",
    language: "en",
    notifications: true,
  });

  const [loading, setLoading] = useState(false);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    let actualTheme = theme;
    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (actualTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const convertTemperature = (celsius) => {
    if (celsius === null || celsius === undefined) {
      return null;
    }
    const value = Number(celsius);
    if (Number.isNaN(value)) {
      return null;
    }
    if (settings.temperatureUnit === "F") {
      return (value * 9) / 5 + 32;
    }
    return value;
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const loadUserSettings = async () => {
      try {
        setLoading(true);
        const res = await getSettings();
        if (!cancelled && res?.data) {
          setSettings((previous) => ({
            ...previous,
            ...res.data,
          }));
        }
      } catch (error) {
        console.error("Unable to load settings:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadUserSettings();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    if (settings.theme !== "system") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemTheme = () => {
      applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleSystemTheme);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemTheme);
    };
  }, [settings.theme]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        applyTheme,
        convertTemperature,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
};

export default SettingsContext;
