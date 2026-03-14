import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Design", "Logo", "Site web", "Vidéos", "Mockup"] as const;
type Category = (typeof categories)[number];

interface Project {
  id: number;
  title: string;
  desc: string;
  category: Category[];
  image: string;
  url?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PixelMedia",
    desc: "Site web moderne pour une agence digitale avec design responsive et animations fluides.",
    category: ["Site web"],
    image: "/src/assets/screenshot-pixelmedia.png",
    url: "https://pixelpub.online/",
  },
  {
    id: 2,
    title: "TicketAfrik",
    desc: "Plateforme de billetterie digitale avec interface intuitive et système de QR Code.",
    category: ["Site web"],
    image: "/src/assets/screenshot-ticketafrik.png",
    url: "https://tickeafrik.pixelpub.online/",
  },
  {
    id: 3,
    title: "Booster Perso",
    desc: "Plateforme de croissance réseaux sociaux avec dashboard et suivi de performance.",
    category: ["Site web"],
    image: "/src/assets/screenshot-boosterperso.png",
    url: "https://booster.perso.bf/",
  },
  {
    id: 4,
    title: "BOOKflow",
    desc: "Solution SaaS de création et vente d'e-books avec système de monétisation intégré.",
    category: ["Site web"],
    image: "/src/assets/screenshot-bookflow.png",
    url: "https://bookflow.pixelpub.online/",
  },
  {
    id: 5,
    title: "Logo Agence Créative",
    desc: "Identité visuelle complète pour une agence créative — logo vectoriel et déclinaisons.",
    category: ["Logo", "Design"],
    image: "",
  },
  {
    id: 6,
    title: "Mockup App Mobile",
    desc: "Maquette UI/UX d'une application mobile de livraison avec parcours utilisateur optimisé.",
    category: ["Mockup", "Design"],
    image: "",
  },
  {
    id: 7,
    title: "Motion Reel",
    desc: "Vidéo promotionnelle avec motion design et montage dynamique pour les réseaux sociaux.",
    category: ["Vidéos"],
    image: "",
  },
  {
    id: 8,
    title: "Branding Restaurant",
    desc: "Création de l'identité visuelle complète : logo, menu, packaging et supports marketing.",
    category: ["Logo", "Design"],
    image: "",
  },
];

const Projets = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<Category>("All");
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setZoomed(false);
  };

  const goNext = () => {
    if (modalIdx === null) return;
    setModalIdx((modalIdx + 1) % filtered.length);
    setZoomed(false);
  };

  const goPrev = () => {
    if (modalIdx === null) return;
    setModalIdx((modalIdx - 1 + filtered.length) % filtered.length);
    setZoomed(false);
  };

  const currentProject = modalIdx !== null ? filtered[modalIdx] : null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
          <a href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              CF
            </span>
            <span className="font-display font-bold text-foreground">Coach Fema</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez mes réalisations en développement, design et création digitale
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openModal(i)}
                  className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-video bg-secondary overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                        {project.category.includes("Logo") ? "🎨" : project.category.includes("Vidéos") ? "🎬" : "📐"}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.category.map((c) => (
                        <span key={c} className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setModalIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <button onClick={goPrev} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {(modalIdx ?? 0) + 1} / {filtered.length}
                  </span>
                  <button onClick={goNext} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {currentProject.image && (
                    <button
                      onClick={() => setZoomed(!zoomed)}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                    </button>
                  )}
                  <button
                    onClick={() => setModalIdx(null)}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className={`bg-secondary overflow-auto ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}>
                {currentProject.image ? (
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    onClick={() => setZoomed(!zoomed)}
                    className={`w-full transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"} object-contain max-h-[60vh]`}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-muted-foreground text-6xl">
                    {currentProject.category.includes("Logo") ? "🎨" : currentProject.category.includes("Vidéos") ? "🎬" : "📐"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentProject.category.map((c) => (
                    <span key={c} className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-2">{currentProject.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{currentProject.desc}</p>
                {currentProject.url && (
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Visiter le projet <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projets;
