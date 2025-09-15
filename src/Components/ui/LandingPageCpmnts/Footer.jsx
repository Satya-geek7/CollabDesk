import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-400 py-12"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">CollabDesk</h3>
          <p>"Your team’s all-in-one AI collaboration hub."</p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            {["Features", "Pricing", "Integrations"].map((item, i) => (
              <li key={i}>
                <a
                  className="
                    relative inline-block
                    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
                    after:h-[1px] after:w-0 after:bg-current
                    after:transition-all after:duration-300
                    hover:after:w-full
                    transition-all duration-300 cursor-pointer
                  "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {["About", "Careers", "Blog"].map((item, i) => (
              <li key={i}>
                <a
                  className="
                    relative inline-block pr-5
                    after:content-['→'] after:absolute after:right-0 after:opacity-0 after:translate-x-[-6px]
                    after:transition-all after:duration-300
                    hover:after:opacity-100 hover:after:translate-x-0
                    transition-all duration-300 cursor-pointer
                  "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            {["Help Center", "Contact", "Privacy Policy"].map((item, i) => (
              <li key={i}>
                <a className="hover:text-purple-400 hover:cursor-pointer">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-8 text-gray-500">
        © 2025 CollabDesk. All rights reserved.
      </div>
    </motion.footer>
  );
}
