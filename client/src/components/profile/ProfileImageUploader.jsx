import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import { uploadProfileImage } from "../../services/userApi";

function ProfileImageUploader({ user, refreshProfile }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    try {
      setLoading(true);
      const res = await uploadProfileImage(file);
      toast.success(res.message);
      refreshProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={
            preview ||
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "User",
            )}&background=2563eb&color=fff&size=256`
          }
          alt="Profile"
          className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl"
        />
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          disabled={loading}
          className="absolute bottom-2 right-2 rounded-full bg-blue-600 p-3 text-white shadow-lg transition hover:bg-blue-700"
        >
          <FaCamera />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleChange}
      />
      {loading && <p className="mt-4 text-sm text-blue-600">Uploading...</p>}
    </div>
  );
}

export default ProfileImageUploader;
