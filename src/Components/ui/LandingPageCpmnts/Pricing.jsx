import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Community support",
        "1 GB storage",
        "Basic task management",
        "Mobile access",
        "Email support",
        "Basic security",
        "Collaboration tools",
        "Limited integrations",
      ],
    },
    {
      name: "Pro",
      price: "$19",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "50 GB storage",
        "Advanced task management",
        "Custom dashboards",
        "Team roles & permissions",
        "Email + Chat support",
        "Enhanced security",
        "Integration with Slack, Zoom",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      features: [
        "Custom integrations",
        "Dedicated account manager",
        "24/7 premium support",
        "1 TB storage",
        "Workflow automation",
        "Advanced reporting",
        "Custom branding",
        "Onboarding assistance",
        "Single Sign-On (SSO)",
        "99.9% uptime SLA",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
      <p className="text-gray-500 mb-12">
        Choose a plan that fits your team's needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-xl shadow-md border transition-all duration-300 ${
              plan.popular ? "border-indigo-600 bg-white" : "bg-gray-100"
            }`}
          >
            {plan.popular && (
              <span className="bg-indigo-600 text-white px-3 py-1 text-xs rounded-full mb-4 inline-block">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-4xl font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold ${
                plan.popular
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
