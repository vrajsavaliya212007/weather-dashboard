import {
  FaCloudSun,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaArrowUp,
} from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  const year = new Date().getFullYear();

  // ========================================
  // Back To Top
  // ========================================

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-5 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm">
            <FaCloudSun />
          </div>
          <div>
            <p className="text-sm font-black text-slate-800 dark:text-white">
              SkyCast Pro
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t("weatherDashboard") || "Weather Dashboard"}
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          © {year} SkyCast Pro.{" "}
          {t("allRightsReserved") || "All Rights Reserved."}
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-white dark:hover:text-slate-900"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            <FaLinkedin />
          </a>
          <a
            href="/"
            aria-label={t("website") || "Website"}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-cyan-500 dark:hover:text-white"
          >
            <FaGlobe />
          </a>
          <span className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={t("backToTop") || "Back to top"}
            title={t("backToTop") || "Back to top"}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
          >
            <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
