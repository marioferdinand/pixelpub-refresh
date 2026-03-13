import { motion } from "framer-motion";

const stats = [
  { value: "4+", label: "Plateformes actives" },
  { value: "1 500+", label: "Clients accompagnés" },
  { value: "50+", label: "Campagnes lancées" },
  { value: "< 0.20$", label: "CPA moyen optimisé" },
  { value: "300%", label: "ROI moyen positif" },
];

const ResultsSection = () => {
  return (
    <section id="resultats" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Résultats & Impact
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border border-border"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
