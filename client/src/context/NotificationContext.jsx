import { createContext, useContext, useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../services/notificationApi";
import { useAuth } from "./AuthContext";
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getNotifications();
      setNotifications(res?.data || []);
    } catch (error) {
      console.error("Unable to load notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      setNotifications([]);
      return;
    }
    loadNotifications();
  }, [user, authLoading]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const markAsRead = async (id) => {
    try {
      const res = await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        ),
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await markAllNotificationsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  const removeNotification = async (id) => {
    try {
      const res = await deleteNotification(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id),
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        loading,
        unreadCount,
        loadNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }
  return context;
};

export default NotificationContext;
