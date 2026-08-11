function LocationInfoCard({ location }) {
  if (!location) return null;
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">Current Coordinates</h2>
      <div className="mt-5 space-y-3">
        <p>
          <strong> {t("latitude")} :</strong> {location.lat}
        </p>
        <p>
          <strong>{t("longitude")} :</strong> {location.lon}
        </p>
      </div>
    </div>
  );
}

export default LocationInfoCard;
