import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      quote: "CollabDesk transformed our workflow. Everything in one place!",
    },
    {
      name: "James Carter",
      role: "Team Lead",
      quote: "The best collaboration tool I've used. Highly recommend!",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8">What our users say</h2>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <p className="text-gray-700 italic">"{t.quote}"</p>
            <div className="mt-4 text-indigo-600 font-semibold">{t.name}</div>
            <div className="text-gray-500 text-sm">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
