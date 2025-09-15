import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/motionVariants";
import nasa from "../../../assets/logos/nasa.svg";
import stripe from "../../../assets/logos/stripe.svg";
import airbnb from "../../../assets/logos/airbnb.svg";
import uber from "../../../assets/logos/uber.svg";
import notion from "../../../assets/logos/notion.svg";

export default function TrustedBy() {
  const logos = [airbnb, uber, nasa, stripe, notion];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="py-16 bg-white text-center"
    >
      <p className="text-gray-500 mb-6 uppercase text-sm tracking-widest">
        Trusted by top teams
      </p>
      <div className="flex justify-center flex-wrap gap-20">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Brand ${i + 1}`}
            className="w-20 h-20 object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110"
          />
        ))}
      </div>
    </motion.section>
  );
}
