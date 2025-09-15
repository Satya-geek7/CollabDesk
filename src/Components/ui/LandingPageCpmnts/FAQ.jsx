import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Our platform integrates all your tools into one workspace, reducing context switching and improving productivity.",
    },
    {
      question: "Is there a free plan?",
      answer:
        "Yes, we offer a free plan for individuals and small teams to get started without any cost.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely! You can cancel your subscription anytime with no hidden fees.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-white max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span className="text-xl">{openIndex === i ? "−" : "+"}</span>
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 mt-2 overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
