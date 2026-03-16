import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Cog, Palette, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/hero-contact.jpg";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, typeof Code> = {
  Code, Users, Palette, Cog,
};

const steps = [
  "Audit rapide du besoin et du contexte",
  "Definition du livrable prioritaire",
  "Production, iteration et mise en ligne",
  "Suivi et ajustements selon les retours",
];

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string[];
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order");
      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero title="Mes" highlight="services" subtitle="Des services complementaires pour construire une presence digitale plus claire, plus solide et plus rentable." image={heroImg} />
      </div>

      <main className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center text-muted-foreground py-12">Chargement...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, index) => {
                const IconComp = iconMap[service.icon] || Code;
                return (
                  <motion.div key={service.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border bg-card p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <IconComp size={24} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{service.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
                    <div className="mt-6 space-y-3">
                      {service.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm">
                          <Check size={16} className="mt-0.5 text-primary" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-bold">Comment je travaille</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">Chaque mission commence par un cadrage simple. L'objectif est d'eviter les livrables flous et de se concentrer sur ce qui cree un vrai impact.</p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Demarrer un besoin <ArrowRight size={18} />
              </Link>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-border bg-background p-4 text-sm">
                  <span className="mr-3 font-bold text-primary">0{index + 1}</span>{step}
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
