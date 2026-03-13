import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels types de sites web développez-vous ?",
    a: "Je développe des sites vitrines, portfolios, e-commerce, applications web et plateformes SaaS avec des technologies modernes et un design soigné.",
  },
  {
    q: "Comment gérez-vous le community management ?",
    a: "Je définis une stratégie éditoriale, crée du contenu engageant, anime vos communautés et analyse les performances pour optimiser votre présence sur les réseaux sociaux.",
  },
  {
    q: "Quels services de design proposez-vous ?",
    a: "Identité visuelle complète, logos, maquettes UI/UX, supports marketing print et digital, et direction artistique pour votre marque.",
  },
  {
    q: "Quels sont vos délais de livraison ?",
    a: "Les délais varient selon la complexité. Un site vitrine : 1-2 semaines. Une identité visuelle : 1 semaine. Une stratégie social media : mise en place en 3-5 jours.",
  },
  {
    q: "Comment sont définis vos tarifs ?",
    a: "Les tarifs sont personnalisés selon vos besoins. Contactez-moi pour un devis gratuit et détaillé adapté à votre projet.",
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
