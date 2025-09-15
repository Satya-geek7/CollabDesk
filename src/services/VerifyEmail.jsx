import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const checkVerification = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email_confirmed_at) {
        setIsVerified(true);
      }
      setLoading(false);
    };

    // check immediately
    checkVerification();

    // poll every 5s until verified
    const interval = setInterval(() => {
      checkVerification();
      setPulseCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Floating particles animation
  const particles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
      animate={{
        x: [0, 100, -50, 80],
        y: [0, -80, -40, -100],
        scale: [0, 1, 0.5, 0],
        opacity: [0, 0.6, 0.3, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "easeInOut",
      }}
      style={{
        left: `${20 + i * 10}%`,
        top: "50%",
      }}
    />
  ));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-600 font-medium"
          >
            Checking verification...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (isVerified) return <Navigate to="/dashboard/overview" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      {particles}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glowing background effect */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur-xl -z-10"
        />

        {/* Main card */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 text-center relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 text-purple-200"
          >
            <Sparkles size={20} />
          </motion.div>

          {/* Animated mail icon */}
          <motion.div
            key={pulseCount}
            animate={{
              scale: [1, 1.2, 1],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            className="mb-6 relative"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Mail size={32} className="text-white" />
            </div>

            {/* Pulse rings */}
            <motion.div
              animate={{
                scale: [1, 2.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 border-2 border-blue-400 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="absolute inset-0 border-2 border-purple-400 rounded-full"
            />
          </motion.div>

          {/* Title with typing effect */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Verify Your Email
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed"
          >
            We've sent you a verification link. Please check your email and
            click the link to continue.
          </motion.p>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw size={18} className="text-blue-600" />
            </motion.div>
            <span className="text-blue-700 font-medium text-sm">
              Checking for verification...
            </span>
          </motion.div>

          {/* Floating success indicator (when verified) */}
          <AnimatePresence>
            {isVerified && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 bg-green-500/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center text-white"
                >
                  <CheckCircle2 size={48} className="mx-auto mb-2" />
                  <p className="font-semibold">Verified!</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-gray-500 text-xs sm:text-sm mt-6 px-4"
        >
          Didn't receive an email? Check your spam folder or wait a moment for
          delivery.
        </motion.p>
      </motion.div>
    </div>
  );
}
