import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../Schemas/zodSchema";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/ui/CmnCmpnts/Input";
import toast from "react-hot-toast";
import useStore from "../../Zustand/useAuthStore"; // ✅ import Zustand store

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser); // ✅ Zustand actions
  const setSession = useStore((state) => state.setSession);
  const setProfile = useStore((state) => state.setProfile);

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Login failed maybe Check your Connection!");
    } else if (!error && signInData.user) {
      setUser(signInData.user);
      setSession(signInData.session);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signInData.user.id)
        .single();

      if (profile) setProfile(profile);

      toast.success("Logged in successfully!");
      navigate("/dashboard/analytics");
    }
  };

  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
      {/* Floating Background Icons */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-300 blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-400 blur-3xl opacity-70 animate-ping" />
        <div className="absolute bottom-1/2 left-1/2 w-28 h-28 rounded-full bg-purple-200 blur-2xl opacity-50 animate-spin-slow" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-md p-8 border border-purple-200"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-purple-700 tracking-tight">
            CollabDesk
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Welcome back! Please log in to your workspace.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type={`${showPass ? "text" : "Password"}`}
            placeholder={`${showPass ? "Enter your Password" : "••••••••••"}`}
            register={register}
            error={errors.password}
          />

          <div>
            <input
              className=" mx-2"
              type="checkbox"
              id="pass"
              name="pass"
              onChange={() => setShowPass(!showPass)}
            />
            <label for="pass">Show Password</label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded-xl shadow hover:bg-purple-800 transition-all disabled:opacity-50"
            transition={{ delay: 0.5 }}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        {/* Switch to Sign Up */}
        <motion.div
          className="text-center mt-6 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-700 font-medium hover:underline"
          >
            Sign up
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
