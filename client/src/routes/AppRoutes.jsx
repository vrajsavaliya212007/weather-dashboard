import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Layout from "../components/layout/Layout";

import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";

import Dashboard from "../pages/Dashboard/Dashboard";
import Favorites from "../pages/Favorites/Favorites";
import Notifications from "../pages/Notifications/Notifications";
import Analytics from "../pages/Analytics/Analytics";
import Weather from "../pages/Weather/Weather";
import Profile from "../pages/Profile/Profile";
import Admin from "../pages/Admin/Admin";
import Search from "../pages/Search/Search";
import Settings from "../pages/Settings/Settings";
import News from "../pages/News/News";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/news" element={<News />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
