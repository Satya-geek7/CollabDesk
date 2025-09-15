import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = ["Create Your Workspace", "Add Your Team", "Start Collaborating"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="py-16 bg-white text-center"
    >
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-lg font-medium border rounded-2xl px-6 py-8 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out bg-gray-50 w-64"
          >
            <span className="text-indigo-600 font-bold text-2xl mb-2">{i + 1}</span>
            <p>{step}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
