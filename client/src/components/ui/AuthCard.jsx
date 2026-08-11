import { motion } from "framer-motion";

function AuthCard({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/20
        bg-white/70
        p-8
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

export default AuthCard;
