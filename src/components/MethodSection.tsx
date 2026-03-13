import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Analyse & stratégie", desc: "Comprendre le business, le marché et définir la stratégie d'acquisition et monétisation." },
  { num: "02", title: "Création plateforme / tunnel", desc: "Construction de la plateforme e-commerce, SaaS ou tunnel de vente optimisé pour la conversion." },
  { num: "03", title: "Lancement publicitaire", desc: "Déploiement des campagnes Facebook & TikTok Ads avec ciblage précis et créatives testées." },
  { num: "04", title: "Optimisation & scaling", desc: "Analyse des performances, réduction du CPA et scaling pour maximiser le ROI." },
];

const MethodSection = () => {
  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Ma méthode
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl p-8"
            >
              <span className="text-5xl font-extrabold text-gradient opacity-60">{step.num}</span>
              <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
