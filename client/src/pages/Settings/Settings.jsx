import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCog,
  FaSave,
  FaPalette,
  FaTemperatureHigh,
  FaWind,
  FaLanguage,
  FaBell,
} from "react-icons/fa";
import { getSettings, updateSettings } from "../../services/settingsApi";
import { useSettings } from "../../context/SettingsContext";
import { useLanguage } from "../../context/LanguageContext";

function Settings() {
  const { setSettings: setGlobalSettings, applyTheme } = useSettings();
  const { t } = useLanguage();
  const [settings, setLocalSettings] = useState({
    theme: "system",
    temperatureUnit: "C",
    windSpeedUnit: "m/s",
    language: "en",
    notifications: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      if (res?.data) {
        setLocalSettings((previous) => ({
          ...previous,
          ...res.data,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setLocalSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings(settings);
      const updatedSettings = res?.data || settings;
      setGlobalSettings((previous) => ({
        ...previous,
        ...updatedSettings,
      }));

      if (updatedSettings.theme) {
        applyTheme(updatedSettings.theme);
      }
      setLocalSettings((previous) => ({
        ...previous,
        ...updatedSettings,
      }));
      toast.success(res?.message || "Settings updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="mt-5 font-semibold text-slate-500 dark:text-slate-400">
            Loading Settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
 
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <FaCog />
          </div>

          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
               {t("settings")}
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Customize your SkyCast experience.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900"
      >

        <SettingsSection
          icon={<FaPalette />}
          title={t("appearance") || "Appearance"}
          description="Choose how SkyCast looks."
        >
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
          >
            <option value="system">System Default</option>

            <option value="light">Light</option>

            <option value="dark">Dark</option>
          </select>
        </SettingsSection>

        <SettingsSection
          icon={<FaTemperatureHigh />}
          title={t("temperatureUnit") || "Temperature Unit"}
          description="Choose the temperature unit used throughout the application."
        >
          <select
            name="temperatureUnit"
            value={settings.temperatureUnit}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
          >
            <option value="C">Celsius (°C)</option>

            <option value="F">Fahrenheit (°F)</option>
          </select>
        </SettingsSection>

        <SettingsSection
          icon={<FaWind />}
          title={t("windSpeedUnit") || "Wind Speed Unit"}
          description="Choose how wind speed should be displayed."
        >
          <select
            name="windSpeedUnit"
            value={settings.windSpeedUnit}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
          >
            <option value="m/s">Meter / Second</option>

            <option value="km/h">Kilometer / Hour</option>

            <option value="mph">Miles / Hour</option>
          </select>
        </SettingsSection>

        <SettingsSection
          icon={<FaLanguage />}
          title={t("language") || "Language"}
          description="Select your preferred application language."
        >
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
          >
            <option value="en">English</option>

            <option value="gu">ગુજરાતી</option>

            <option value="hi">हिन्दी</option>
          </select>
        </SettingsSection>

        <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <FaBell />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Weather Notifications
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Receive weather alerts and important notifications from
                  SkyCast.
                </p>
              </div>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="peer sr-only"
              />

              <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 dark:bg-slate-700 dark:peer-focus:ring-blue-900/40" />

              <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-slate-950">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Keep your preferences up to date.
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Changes are saved to your account.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave />

            {saving ? "Saving..." : t("saveSettings") || "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingsSection({ icon, title, description, children }) {
  return (
    <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-8">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

export default Settings;
