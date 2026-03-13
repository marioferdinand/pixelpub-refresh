import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import screenshotPixelmedia from "@/assets/screenshot-pixelmedia.png";
import screenshotTicketafrik from "@/assets/screenshot-ticketafrik.png";
import screenshotBoosterperso from "@/assets/screenshot-boosterperso.png";
import screenshotBookflow from "@/assets/screenshot-bookflow.png";

const projects = [
  {
    image: screenshotPixelmedia,
    tag: "Agence",
    title: "PixelMedia",
    desc: "Agence digitale spécialisée dans la création de sites web modernes, automatisation IA et solutions marketing pour entrepreneurs africains.",
    url: "https://pixelpub.online/",
  },
  {
    image: screenshotTicketafrik,
    tag: "EventTech",
    title: "TicketAfrik",
    desc: "Plateforme de billetterie digitale avec QR Code permettant aux organisateurs d'événements de vendre et scanner des tickets facilement.",
    url: "https://tickeafrik.pixelpub.online/",
  },
  {
    image: screenshotBoosterperso,
    tag: "Growth",
    title: "Booster Perso",
    desc: "Plateforme de croissance réseaux sociaux permettant d'augmenter abonnés, vues et engagement avec des stratégies optimisées.",
    url: "https://booster.perso.bf/",
  },
  {
    image: screenshotBookflow,
    tag: "SaaS",
    title: "BOOKflow",
    desc: "Solution SaaS permettant de créer et vendre des e-books générés par IA avec système de monétisation intégré.",
    url: "https://bookflow.pixelpub.online/",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Projets & plateformes lancées
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {project.tag}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.desc}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                >
                  Visiter la plateforme <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
