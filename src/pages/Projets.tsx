import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Play, Download } from "lucide-react";
import SubpageNav from "@/components/SubpageNav";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/hero-projets.jpg";
import { supabase } from "@/integrations/supabase/client";

const filterCategories = ["All", "Design", "Logo", "Site web", "Vidéos", "Mockup"] as const;
type Category = (typeof filterCategories)[number];

interface Project {
  id: string;
  title: string;
  description: string;
  categories: string[];
  media: string[];
  url: string | null;
  video_url: string | null;
}

const getCategoryIcon = (cats: string[]) => {
  if (cats.includes("Logo")) return "🎨";
  if (cats.includes("Vidéos")) return "🎬";
  if (cats.includes("Mockup")) return "📐";
  return "💻";
};

const Projets = () => {
  const [active, setActive] = useState<Category>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order");
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setMediaIdx(0);
    setZoomed(false);
  };

  const nextMedia = () => {
    if (!selectedProject) return;
    setMediaIdx((mediaIdx + 1) % selectedProject.media.length);
    setZoomed(false);
  };

  const prevMedia = () => {
    if (!selectedProject) return;
    setMediaIdx((mediaIdx - 1 + selectedProject.media.length) % selectedProject.media.length);
    setZoomed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SubpageNav />
      <div className="pt-16">
        <PageHero title="Mes" highlight="Projets" subtitle="Découvrez mes réalisations en développement, design et création digitale" image={heroImg} />
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Chargement...</div>
          ) : (
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
                    onClick={() => openModal(project)}
                    className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-colors"
                  >
                    <div className="aspect-video bg-secondary overflow-hidden">
                      {project.media.length > 0 ? (
                        <img src={project.media[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                          {getCategoryIcon(project.categories)}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories.map((c) => (
                          <span key={c} className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {selectedProject.media.length > 1 && (
                    <>
                      <button onClick={prevMedia} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"><ChevronLeft size={18} /></button>
                      <span className="text-sm text-muted-foreground">{mediaIdx + 1} / {selectedProject.media.length}</span>
                      <button onClick={nextMedia} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"><ChevronRight size={18} /></button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedProject.media.length > 0 && (
                    <button onClick={() => setZoomed(!zoomed)} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                      {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                    </button>
                  )}
                  <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"><X size={18} /></button>
                </div>
              </div>

              <div className={`bg-secondary overflow-auto ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}>
                {selectedProject.media.length > 0 ? (
                  <img
                    src={selectedProject.media[mediaIdx]}
                    alt={selectedProject.title}
                    onClick={() => setZoomed(!zoomed)}
                    className={`w-full transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"} object-contain max-h-[60vh]`}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-muted-foreground text-6xl">
                    {getCategoryIcon(selectedProject.categories)}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedProject.categories.map((c) => (
                    <span key={c} className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.url && selectedProject.categories.includes("Site web") && (
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      Visiter le site <ExternalLink size={16} />
                    </a>
                  )}
                  {selectedProject.video_url && selectedProject.categories.includes("Vidéos") && (
                    <a href={selectedProject.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      Regarder la vidéo <Play size={16} />
                    </a>
                  )}
                  {(selectedProject.categories.includes("Design") || selectedProject.categories.includes("Logo") || selectedProject.categories.includes("Mockup")) && (
                    <button className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-secondary/80 transition-colors">
                      Télécharger le fichier <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projets;
