import { motion } from "framer-motion";
import { Code, Users, Palette, Cog } from "lucide-react";

const expertises = [
  {
    icon: Code,
    title: "Développement Web & Mobile",
    desc: "Création de sites web modernes, applications mobiles et plateformes sur mesure avec les technologies les plus récentes.",
  },
  {
    icon: Users,
    title: "Community Management",
    desc: "Gestion de communautés, stratégie de contenu, animation des réseaux sociaux et croissance d'audience organique.",
  },
  {
    icon: Palette,
    title: "Design UI/UX & Graphique",
    desc: "Création d'identités visuelles, maquettes UI/UX, logos, supports marketing et designs impactants pour votre marque.",
  },
  {
    icon: Cog,
    title: "Stratégie Digitale",
    desc: "Accompagnement stratégique complet : branding, positionnement, plan de contenu et optimisation de présence en ligne.",
  },
];

const ExpertiseSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes services</h2>
          <p className="text-muted-foreground">Des compétences complètes pour votre présence digitale</p>
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
