import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à scaler votre business ?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Discutons de votre projet et transformons votre business en machine à revenus.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Me contacter <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
