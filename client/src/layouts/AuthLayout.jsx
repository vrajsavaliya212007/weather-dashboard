import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";

function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen">
        <div className="hidden w-1/2 items-center justify-center lg:flex">
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-xl px-10 text-white"
          >
            <WiDaySunny className="mb-6 text-[120px] text-yellow-300 animate-float" />
            <h1 className="mb-6 text-6xl font-black leading-tight">
              SkyCast Pro
            </h1>
            <p className="max-w-lg text-xl leading-9 text-slate-200">
              Professional Weather Dashboard built with the MERN Stack.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-xl"
              >
                <div className="text-2xl">🌦</div>
                <p className="mt-2 font-semibold">Live Forecast</p>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-xl"
              >
                <div className="text-2xl">📊</div>
                <p className="mt-2 font-semibold">Analytics</p>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-xl"
              >
                <div className="text-2xl">🗺</div>
                <p className="mt-2 font-semibold">Interactive Map</p>
              </motion.div>
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-xl"
              >
                <div className="text-2xl">🔔</div>

                <p className="mt-2 font-semibold">Alerts</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="flex min-h-screen flex-1 items-center justify-center p-5 sm:p-8 lg:w-1/2 lg:p-12">
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
