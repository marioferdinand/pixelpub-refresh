import { motion } from "framer-motion";

const specializations = [
  "Publicité Facebook & TikTok Ads",
  "Création de plateformes SaaS & E-commerce",
  "Automatisation WhatsApp & IA",
  "Monétisation & scaling digital",
  "Tunnel de vente & stratégie d'acquisition",
];

const AboutSection = () => {
  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            À propos de <span className="text-gradient">SEDGO TK ALASSANE</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Entrepreneur digital basé en Afrique de l'Ouest, fondateur de plusieurs plateformes actives dont PixelMedia, TicketAfrik, Booster Perso et BOOKflow.
          </p>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Spécialisé en e-commerce, publicité digitale et création SaaS, j'accompagne entrepreneurs et PME dans la mise en place de systèmes rentables : boutiques en ligne, campagnes Facebook & TikTok Ads, automatisations WhatsApp et tunnels de vente.
          </p>

          <div className="bg-secondary/50 border border-border rounded-2xl p-8 mb-10">
            <h3 className="text-xl font-bold mb-3">Ma Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Construire un écosystème digital africain puissant, autonome et rentable — où chaque entrepreneur a accès aux mêmes outils que les leaders mondiaux.
            </p>
            <p className="text-foreground font-semibold mt-4">
              Je ne crée pas juste des plateformes. Je construis des machines à revenus.
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4">Spécialisations</h3>
          <div className="flex flex-wrap gap-3">
            {specializations.map((s) => (
              <span key={s} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
