import { motion } from "framer-motion";
import { Code, Cog, Palette, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/hero-contact.jpg";

const services = [
  {
    icon: Code,
    title: "Developpement web",
    desc: "Creation de sites vitrines, applications web et plateformes sur mesure avec une base claire et evolutive.",
    points: ["Architecture front propre", "Responsive", "Optimisation performance"],
  },
  {
    icon: Users,
    title: "Community management",
    desc: "Structuration editoriale, animation des reseaux et suivi des contenus pour installer une presence reguliere.",
    points: ["Calendrier editorial", "Gestion de communaute", "Suivi des resultats"],
  },
  {
    icon: Palette,
    title: "Design UI/UX & branding",
    desc: "Creation d'interfaces, identites visuelles et supports coherents avec votre positionnement.",
    points: ["Maquettes UI", "Identite visuelle", "Supports marketing"],
  },
  {
    icon: Cog,
    title: "Strategie digitale",
    desc: "Cadrage de l'offre, clarte de la promesse et priorisation des actions pour mieux convertir.",
    points: ["Positionnement", "Tunnel d'acquisition", "Plan d'action"],
  },
];

const steps = [
  "Audit rapide du besoin et du contexte",
  "Definition du livrable prioritaire",
  "Production, iteration et mise en ligne",
  "Suivi et ajustements selon les retours",
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        <PageHero
          title="Mes"
          highlight="services"
          subtitle="Des services complementaires pour construire une presence digitale plus claire, plus solide et plus rentable."
          image={heroImg}
        />
      </div>

      <main className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.desc}</p>
                <div className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 text-primary" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-bold">Comment je travaille</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Chaque mission commence par un cadrage simple. L'objectif est d'eviter les livrables flous et de se concentrer sur ce qui cree un vrai impact.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Demarrer un besoin <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-border bg-background p-4 text-sm">
                  <span className="mr-3 font-bold text-primary">0{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
