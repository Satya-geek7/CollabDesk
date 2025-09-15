import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../utils/motionVariants";
import Dashboard from "../../../assets/Dashboard.png";

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-white overflow-hidden">
      {/* ✅ Animated floating circles */}
      <motion.div
        className="absolute top-10 left-20 w-36 h-36 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-44 h-44 bg-orange-400/30 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6">
        {/* ✅ Left Side (Text) */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="show"
          className="md:w-1/2 space-y-6 text-center md:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            'The AI Hub for modern work!'
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-90"
          >
            All your work in one intelligent workspace—streamlined, automated, powered by AI. The future of work isn’t next—it’s now, and it’s AI-driven.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100"
            >
              Try for Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-900 text-white px-6 py-3 rounded-full hover:bg-purple-800"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ✅ Right Side (Floating Hero Image) */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="md:w-1/2 mt-10 md:ml-28 md:mt-0 relative"
        >
          <motion.img
            src={Dashboard}
            alt="CollabDesk Dashboard"
            className="w-[440px] max-w-lg rounded-lg shadow-2xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
