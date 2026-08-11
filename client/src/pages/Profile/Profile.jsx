import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getProfile } from "../../services/userApi";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import ProfileForm from "../../components/profile/ProfileForm";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setUser: setAuthUser } = useAuth();
  const { t } = useLanguage();


  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      const profileUser = res.data;

      setUser(profileUser);

      setAuthUser(profileUser);
    } catch (error) {
      toast.error(error.response?.data?.message || t("profileLoadError"));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadProfile();
  }, []);


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="mt-4 text-xl font-bold text-slate-700 dark:text-slate-200">
            {t("loadingProfile")}
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          {t("myProfile")}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {t("manageProfile")}
        </p>
      </div>


      <div className="grid gap-8 lg:grid-cols-3">

        <ProfileInfoCard user={user} refreshProfile={loadProfile} />

        <div className="lg:col-span-2">
          <ProfileForm user={user} refreshProfile={loadProfile} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
