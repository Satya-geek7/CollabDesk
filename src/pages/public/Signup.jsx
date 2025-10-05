import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../Schemas/zodSchema";
import { supabase } from "../../lib/supabaseClient";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/ui/CmnCmpnts/Input";
import toast from "react-hot-toast";
import useStore from "../../Zustand/useAuthStore"; // ✅ import Zustand store

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const setUser = useStore((state) => state.setUser);
  const setSession = useStore((state) => state.setSession);
  const setProfile = useStore((state) => state.setProfile);

  const onSubmit = async (formData) => {
    setMessage("");

    const { email, password, name } = formData;

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      toast.error(error.message || "Something went wrong.");
      return;
    }

    if (signUpData?.user) {
      // ✅ create profile row
      await supabase.from("profiles").upsert({
        id: signUpData.user.id,
        display_name: name,
        username:
          name?.toLowerCase().replace(/\s+/g, "-") ||
          signUpData.user.email.split("@")[0],
        avatar_url: null,
      });

      // ✅ store user & session in Zustand
      setUser(signUpData.user);
      setSession(signUpData.session);

      // ✅ fetch and store profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signUpData.user.id)
        .single();

      if (profile) setProfile(profile);

      // ✅ success message + redirect
      toast.success("Welcome! Please verify from Gmail", {
        duration: 4000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        icon: "👏",
      });

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join CollabDesk in a few steps.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            register={register}
            error={errors.name}
          />

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
            type="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white font-semibold py-3 rounded-xl shadow hover:bg-purple-800 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-purple-600">{message}</p>
        )}

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-700 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
