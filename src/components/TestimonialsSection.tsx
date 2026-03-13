import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Ils parlent de mes résultats
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
        >
          <Quote size={32} className="text-primary mx-auto mb-6" />
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
            "Grâce à Assane, j'ai multiplié mes ventes par 3 en seulement 2 mois avec des campagnes publicitaires ultra ciblées."
          </p>
          <div>
            <div className="font-bold text-foreground">Ibrahim K.</div>
            <div className="text-sm text-muted-foreground">E-commerçant</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
