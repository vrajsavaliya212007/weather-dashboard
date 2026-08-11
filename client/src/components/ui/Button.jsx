import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
}) {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.03,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
      }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        px-5
        py-3
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {loading ? "Please Wait..." : children}
    </motion.button>
  );
}

export default Button;
