import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../../services/settingsApi";

function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    theme: "system",
    temperatureUnit: "C",
    windSpeedUnit: "m/s",
    language: "en",
    notifications: true,
  });

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      setForm(res.data);
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
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings(form);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        Loading Settings...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >
      <div>
        <label className="mb-2 block font-semibold">Theme</label>
        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Temperature Unit</label>
        <select
          name="temperatureUnit"
          value={form.temperatureUnit}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Wind Speed Unit</label>
        <select
          name="windSpeedUnit"
          value={form.windSpeedUnit}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="m/s">m/s</option>
          <option value="km/h">km/h</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Language</label>
        <input
          type="text"
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="notifications"
          checked={form.notifications}
          onChange={handleChange}
        />
        Enable Notifications
      </label>
      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}

export default SettingsForm;
