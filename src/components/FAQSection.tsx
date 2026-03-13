import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels types de boutiques e-commerce créez-vous ?",
    a: "Je crée des boutiques en ligne optimisées pour la conversion, avec intégration de paiements mobiles et systèmes d'automatisation adaptés au marché africain.",
  },
  {
    q: "Comment fonctionnent vos campagnes Facebook & TikTok Ads ?",
    a: "Je mets en place des campagnes ciblées avec tests créatifs, optimisation du CPA et scaling progressif pour maximiser votre retour sur investissement.",
  },
  {
    q: "Qu'est-ce que le VibeCoding ?",
    a: "Le VibeCoding est une approche de développement rapide utilisant les outils IA de nouvelle génération pour créer des plateformes modernes en un temps record.",
  },
  {
    q: "Quels sont vos délais de livraison ?",
    a: "Les délais varient selon la complexité du projet. Une boutique e-commerce peut être livrée en 1-2 semaines, un SaaS en 3-6 semaines.",
  },
  {
    q: "Comment sont définis vos tarifs ?",
    a: "Les tarifs sont personnalisés selon la portée du projet. Contactez-moi pour un devis gratuit adapté à vos besoins spécifiques.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Questions fréquentes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
