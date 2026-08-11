import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:ml-[280px]">
        <Navbar />
        <main className="w-full flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
