import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../utils/motionVariants";

export default function Features() {
  const features = [
    {
      title: "Channels for Organized Communication",
      desc: "Collaborate with your team in real-time with dedicated channels.",
      img: "/images/feature1.png",
    },
    {
      title: "Integrations with Your Favorite Tools",
      desc: "Connect apps you already use to simplify workflows.",
      img: "/images/feature2.png",
    },
    {
      title: "Secure File Sharing",
      desc: "Keep your files organized and accessible to your team.",
      img: "/images/feature3.png",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:w-1/2 space-y-4"
            >
              <h3 className="text-3xl font-bold">{f.title}</h3>
              <p className="text-gray-600 text-lg">{f.desc}</p>
            </motion.div>
            <motion.div
              variants={i % 2 === 0 ? fadeRight : fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <img src={f.img} alt={f.title} className="rounded-xl shadow-lg" />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
