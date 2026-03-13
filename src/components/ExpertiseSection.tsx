import { motion } from "framer-motion";
import { ShoppingCart, Megaphone, Code, Cog } from "lucide-react";

const expertises = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Création de boutiques en ligne optimisées pour la conversion, intégration paiements, tunnels de vente et automatisations.",
  },
  {
    icon: Megaphone,
    title: "Publicité Facebook & TikTok",
    desc: "Création et gestion de campagnes performantes : acquisition client, CPA optimisé, scaling publicitaire, tests créatives.",
  },
  {
    icon: Code,
    title: "VibeCoding & Création SaaS",
    desc: "Création rapide de plateformes modernes via outils nouvelle génération, automatisation IA, intégration API.",
  },
  {
    icon: Cog,
    title: "Automatisation Business",
    desc: "Systèmes WhatsApp automatisés, tunnel de vente, paiement mobile, CRM & suivi client.",
  },
];

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mon expertise</h2>
          <p className="text-muted-foreground">4+ projets lancés</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {expertises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
