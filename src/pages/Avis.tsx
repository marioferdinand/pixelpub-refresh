import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MessageSquareQuote, Plus, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-contact.jpg";
import { supabase } from "@/integrations/supabase/client";

const categories = ["Tous", "Clients", "Partenaires", "Collaborateurs"] as const;
type ReviewCategory = (typeof categories)[number];

type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  impact: string;
  category: string;
  rating: number;
};

const strengths = [
  "Clarte de l'offre et du message",
  "Execution rapide et structuree",
  "Design plus credible",
  "Parcours utilisateur plus lisible",
];

const defaultForm = {
  name: "",
  role: "",
  company: "",
  quote: "",
  impact: "",
  category: "Clients" as string,
  rating: 5,
};

const Avis = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("Tous");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (data) setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    if (activeCategory === "Tous") return reviews;
    return reviews.filter((review) => review.category === activeCategory);
  }, [activeCategory, reviews]);

  const reviewSlides = useMemo(() => {
    const slides: Review[][] = [];
    for (let index = 0; index < filteredReviews.length; index += 2) {
      slides.push(filteredReviews.slice(index, index + 2));
    }
    return slides;
  }, [filteredReviews]);

  useEffect(() => { setActiveSlide(0); }, [activeCategory, reviews.length]);

  const closeModal = () => { setIsModalOpen(false); setHoveredRating(null); };
  const openModal = () => { setForm(defaultForm); setHoveredRating(null); setIsModalOpen(true); };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.quote.trim() || !form.impact.trim()) {
      toast({ title: "Champs requis", description: "Remplissez au moins le nom, le role, l'avis et l'impact.", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      role: form.role.trim(),
      company: form.company.trim() || "Independant",
      quote: form.quote.trim(),
      impact: form.impact.trim(),
      category: form.category,
      rating: form.rating,
      approved: false,
    });

    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer l'avis.", variant: "destructive" });
      return;
    }

    closeModal();
    toast({ title: "Avis envoyé", description: "Votre avis sera visible après validation. Merci !" });
  };

  const handlePrevSlide = () => {
    if (reviewSlides.length === 0) return;
    setActiveSlide((current) => (current - 1 + reviewSlides.length) % reviewSlides.length);
  };
  const handleNextSlide = () => {
    if (reviewSlides.length === 0) return;
    setActiveSlide((current) => (current + 1) % reviewSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PageHero title="Ils donnent leur" highlight="avis" subtitle="Retours classes par type de relation: clients, partenaires et collaborateurs." image={heroImg} />
      </div>

      <main className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <section className="rounded-3xl border border-border bg-card p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Avis par categorie</h2>
                <p className="mt-3 text-muted-foreground">Filtrez les retours selon le type de relation pour lire les avis les plus pertinents.</p>
              </div>
              <button type="button" onClick={openModal} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <Plus size={18} /> Ajouter un avis
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${activeCategory === category ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground hover:text-foreground"}`}>
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-border bg-card p-8">
            {loading ? (
              <div className="text-center text-muted-foreground py-8">Chargement...</div>
            ) : filteredReviews.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">Avis en slide</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{activeSlide + 1} / {reviewSlides.length}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={handlePrevSlide} className="rounded-xl border border-border p-3 text-foreground transition-colors hover:bg-secondary"><ChevronLeft size={18} /></button>
                    <button type="button" onClick={handleNextSlide} className="rounded-xl border border-border p-3 text-foreground transition-colors hover:bg-secondary"><ChevronRight size={18} /></button>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={`slide-${activeSlide}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }} className="grid gap-6 lg:grid-cols-2">
                      {reviewSlides[activeSlide]?.map((review) => (
                        <article key={review.id} className="rounded-2xl border border-border bg-background p-8">
                          <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MessageSquareQuote size={28} className="text-primary" />
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{review.category}</span>
                            </div>
                            <div className="flex items-center gap-1 text-primary">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star key={starIndex} size={18} fill={starIndex < review.rating ? "currentColor" : "none"} className={starIndex < review.rating ? "" : "opacity-35"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xl leading-relaxed text-foreground">"{review.quote}"</p>
                          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-foreground">{review.impact}</div>
                          <div className="mt-6">
                            <div className="font-bold text-foreground">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.role} · {review.company}</div>
                          </div>
                        </article>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {reviewSlides.map((slide, index) => (
                    <button key={`indicator-${index}`} type="button" onClick={() => setActiveSlide(index)} className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/50"}`} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-background p-8 text-center text-muted-foreground">Aucun avis dans cette categorie pour le moment.</div>
            )}
          </section>

          <section className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold">Ce qui revient le plus souvent</h2>
              <p className="mt-4 text-muted-foreground">Les retours clients tournent generalement autour de quatre points.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {strengths.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background p-4 text-sm font-medium text-foreground">{item}</div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-3xl font-bold">Vous avez un projet similaire ?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Si vous voulez une presence digitale plus claire et plus solide, la suite logique est de cadrer votre besoin.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Me contacter <ArrowRight size={18} /></Link>
              <Link to="/projets" className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary">Voir les projets</Link>
            </div>
          </section>
        </div>
      </main>

      {/* Add Review Modal */}
      <AnimatePresence>
        {isModalOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-background/80 px-3 py-8 backdrop-blur-sm sm:px-6 sm:py-12" onClick={closeModal}>
            <div className="flex min-h-full items-center justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.18 }} className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-5 sm:max-h-[calc(100vh-6rem)] sm:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold sm:text-3xl">Ajouter un avis</h2>
                      <p className="mt-2 text-sm text-muted-foreground sm:text-base">Renseignez votre retour et notez l'experience.</p>
                    </div>
                    <button type="button" onClick={closeModal} className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"><X size={18} /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input type="text" value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Nom complet" className="rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                      <input type="text" value={form.role} onChange={(e) => setForm((c) => ({ ...c, role: e.target.value }))} placeholder="Role" className="rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                    </div>
                    <input type="text" value={form.company} onChange={(e) => setForm((c) => ({ ...c, company: e.target.value }))} placeholder="Structure / entreprise" className="rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <select value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} className="rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary">
                        {categories.filter((c) => c !== "Tous").map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                      <div className="rounded-xl border border-input bg-background px-4 py-3">
                        <div className="mb-2 text-sm font-medium text-foreground">Note</div>
                        <div className="flex flex-wrap items-center gap-2">
                          {Array.from({ length: 5 }).map((_, index) => {
                            const value = index + 1;
                            const activeValue = hoveredRating ?? form.rating;
                            return (
                              <button key={value} type="button" onMouseEnter={() => setHoveredRating(value)} onMouseLeave={() => setHoveredRating(null)} onClick={() => setForm((c) => ({ ...c, rating: value }))} className="text-primary transition-transform hover:scale-110">
                                <Star size={22} fill={value <= activeValue ? "currentColor" : "none"} className={value <= activeValue ? "" : "opacity-35"} />
                              </button>
                            );
                          })}
                          <span className="ml-1 text-sm font-medium text-muted-foreground">{hoveredRating ?? form.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <textarea value={form.quote} onChange={(e) => setForm((c) => ({ ...c, quote: e.target.value }))} placeholder="Votre avis" rows={5} className="min-h-[140px] rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                    <textarea value={form.impact} onChange={(e) => setForm((c) => ({ ...c, impact: e.target.value }))} placeholder="Resultat / impact observe" rows={3} className="rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Ajouter l'avis</button>
                      <button type="button" onClick={closeModal} className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary">Annuler</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Avis;
