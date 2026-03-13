import { motion } from "framer-motion";

const specializations = [
  "Développement web & mobile",
  "Community Management & réseaux sociaux",
  "Design UI/UX & identité visuelle",
  "Stratégie digitale & branding",
  "Création de contenu & storytelling",
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
            À propos de <span className="text-gradient">Coach Fema</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Professionnel du digital passionné, je combine développement, community management et design pour offrir des solutions complètes aux entrepreneurs et marques qui veulent se démarquer en ligne.
          </p>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Mon approche multidisciplinaire me permet de créer des expériences digitales cohérentes — du design à la mise en ligne, en passant par la gestion de communauté et la stratégie de contenu.
          </p>

          <div className="bg-secondary/50 border border-border rounded-2xl p-8 mb-10">
            <h3 className="text-xl font-bold mb-3">Ma Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rendre le digital accessible et performant pour chaque entrepreneur — en combinant créativité, technique et stratégie pour des résultats concrets.
            </p>
            <p className="text-foreground font-semibold mt-4">
              Je ne crée pas juste des sites. Je construis des marques digitales impactantes.
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
