import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 bg-indigo-600 text-center text-white"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to bring your team together?</h2>
      <p className="mb-6">Takes less than 2 minutes to set up.</p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Start Free
        </button>
        <button className="border border-white px-6 py-3 rounded-lg hover:bg-indigo-500">
          Login
        </button>
      </div>
    </motion.section>
  );
}
