import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShieldAlt,
  FaBan,
  FaCheckCircle,
} from "react-icons/fa";
function UserDetailsModal({ user, onClose }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [user]);
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const resetScroll = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
        contentRef.current.scrollLeft = 0;
      }
    };
    resetScroll();
    const frame = requestAnimationFrame(() => {
      resetScroll();
    });
    const timer = setTimeout(() => {
      resetScroll();
    }, 50);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [user, onClose]);

  if (!user) {
    return null;
  }

  const location =
    user.city || user.country
      ? `${user.city || ""}${
          user.city && user.country ? ", " : ""
        }${user.country || ""}`
      : "Not provided";
  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-start
        justify-center
        overflow-hidden
        bg-slate-950/70
        p-0
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        key={user._id}
        className="
          relative
          flex
          w-full
          flex-col
          overflow-hidden
          rounded-none
          bg-white
          shadow-2xl
          sm:max-w-4xl
          sm:rounded-b-3xl
        "
        style={{
          height: "100dvh",
          maxHeight: "100dvh",
          minHeight: 0,
        }}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className="
            flex
            min-h-[104px]
            flex-shrink-0
            items-center
            justify-between
            gap-4
            border-b
            border-slate-200
            bg-white
            px-5
            py-5
            sm:px-7
          "
        >
          <div className="min-w-0">
            <h2
              className="
                text-2xl
                font-black
                leading-tight
                text-slate-900
                sm:text-3xl
              "
            >
              User Details
            </h2>
            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Complete account information
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close user details"
            className="
              flex
              h-11
              w-11
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-lg
              text-slate-600
              transition
              hover:bg-slate-200
              hover:text-slate-900
            "
          >
            <FaTimes />
          </button>
        </div>
        <div
          ref={contentRef}
          className="
            user-details-modal-body
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain
            px-5
            py-5
            sm:px-7
            sm:py-6
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowAnchor: "none",
          }}
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-blue-600
              via-blue-600
              to-cyan-500
              px-5
              py-7
              text-center
              text-white
              sm:rounded-3xl
              sm:px-8
              sm:py-9
            "
          >
            <div
              className="
                absolute
                -right-16
                -top-16
                h-48
                w-48
                rounded-full
                bg-white/10
              "
            />
            <div
              className="
                absolute
                -bottom-20
                -left-16
                h-48
                w-48
                rounded-full
                bg-white/10
              "
            />
            <div className="relative z-10 flex justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="
                    h-20
                    w-20
                    rounded-full
                    border-4
                    border-white
                    object-cover
                    shadow-xl
                    sm:h-24
                    sm:w-24
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-3xl
                    font-black
                    text-blue-600
                    shadow-xl
                    sm:h-24
                    sm:w-24
                  "
                >
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <h3
              className="
                relative
                z-10
                mt-4
                break-words
                text-2xl
                font-black
                sm:text-3xl
              "
            >
              {user.name || "User"}
            </h3>
            <p
              className="
                relative
                z-10
                mt-1
                break-all
                text-sm
                text-white/85
                sm:text-base
              "
            >
              {user.email || "No email provided"}
            </p>
            <div
              className="
                relative
                z-10
                mt-4
                flex
                flex-wrap
                justify-center
                gap-2
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/20
                  px-4
                  py-2
                  text-xs
                  font-bold
                  backdrop-blur
                  sm:text-sm
                "
              >
                <FaShieldAlt />
                {user.role === "admin" ? "Administrator" : "Regular User"}
              </span>
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/20
                  px-4
                  py-2
                  text-xs
                  font-bold
                  backdrop-blur
                  sm:text-sm
                "
              >
                {user.isBlocked ? <FaBan /> : <FaCheckCircle />}
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
          </div>
          <section className="mt-6">
            <div className="mb-4">
              <h3
                className="
                  text-xl
                  font-black
                  text-slate-900
                  sm:text-2xl
                "
              >
                Account Information
              </h3>
              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Basic information associated with this account.
              </p>
            </div>
            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
                sm:gap-4
              "
            >
              <InfoItem icon={<FaUser />} label="Full Name" value={user.name} />
              <InfoItem
                icon={<FaEnvelope />}
                label="Email"
                value={user.email}
              />
              <InfoItem
                icon={<FaPhone />}
                label="Phone"
                value={user.phone || "Not provided"}
              />
              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={location}
              />
              <InfoItem
                icon={<FaShieldAlt />}
                label="Role"
                value={user.role === "admin" ? "Administrator" : "Regular User"}
              />
              <InfoItem
                icon={user.isBlocked ? <FaBan /> : <FaCheckCircle />}
                label="Account Status"
                value={user.isBlocked ? "Blocked" : "Active"}
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Joined"
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "Not available"
                }
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Last Updated"
                value={
                  user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString()
                    : "Not available"
                }
              />
            </div>
          </section>
          <section
            className="
              mt-6
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-5
            "
          >
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Bio
            </p>
            <p
              className="
                mt-2
                break-words
                text-sm
                leading-6
                text-slate-700
              "
            >
              {user.bio || "No bio provided."}
            </p>
          </section>
          {user.settings && (
            <section
              className="
                mt-6
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
              "
            >
              <h3
                className="
                  text-xl
                  font-black
                  text-slate-900
                "
              >
                User Preferences
              </h3>
              <div
                className="
                  mt-4
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <PreferenceItem
                  label="Theme"
                  value={user.settings.theme || "Not set"}
                />
                <PreferenceItem
                  label="Temperature"
                  value={
                    user.settings.temperatureUnit
                      ? `°${user.settings.temperatureUnit}`
                      : "Not set"
                  }
                />
                <PreferenceItem
                  label="Wind Speed"
                  value={user.settings.windSpeedUnit || "Not set"}
                />
                <PreferenceItem
                  label="Notifications"
                  value={user.settings.notifications ? "Enabled" : "Disabled"}
                />
              </div>
            </section>
          )}
          <div className="h-6" />
        </div>
      </div>

      <style>
        {`
          .user-details-modal-body::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }
          .user-details-modal-body {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          @media (max-width: 767px) {
            .user-details-modal-body {
              padding-left: 16px;
              padding-right: 16px;
            }
          }
          @media (max-width: 480px) {
            .user-details-modal-body {
              padding: 16px;
            }
          }
        `}
      </style>
    </div>,
    document.body,
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div
      className="
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
      "
    >
      <div
        className="
          flex
          min-w-0
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-100
            text-blue-600
          "
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            {label}
          </p>
          <p
            className="
              mt-1
              break-words
              text-sm
              font-bold
              text-slate-800
              sm:text-base
            "
          >
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

function PreferenceItem({ label, value }) {
  return (
    <div>
      <p
        className="
          text-xs
          font-semibold
          text-slate-500
        "
      >
        {label}
      </p>
      <p
        className="
          mt-1
          break-words
          text-sm
          font-bold
          capitalize
          text-slate-800
        "
      >
        {value}
      </p>
    </div>
  );
}

export default UserDetailsModal;
