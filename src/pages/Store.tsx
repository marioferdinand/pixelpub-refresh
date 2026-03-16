import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, ChevronLeft, ChevronRight, ExternalLink, BookOpen, GraduationCap, CreditCard, Eye } from "lucide-react";
import SubpageNav from "@/components/SubpageNav";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/hero-store.jpg";
import { supabase } from "@/integrations/supabase/client";

const storeCategories = ["All", "Site", "Abonnement", "Livre", "Formation"] as const;
type StoreCat = (typeof storeCategories)[number];

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  emoji: string;
  features: string[];
  media: string[];
  demo_url: string | null;
  chapters: string[] | null;
  modules: string[] | null;
  billing_cycle: string | null;
}

const Store = () => {
  const [active, setActive] = useState<StoreCat>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mediaIdx, setMediaIdx] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("sort_order");
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setMediaIdx(0);
  };

  const getActionButton = (product: Product) => {
    switch (product.category) {
      case "Abonnement":
        return (<button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><CreditCard size={18} /> S'abonner</button>);
      case "Livre":
        return (<button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><BookOpen size={18} /> Acheter le livre</button>);
      case "Formation":
        return (<button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><GraduationCap size={18} /> Accéder à la formation</button>);
      case "Site":
        return (<button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><ShoppingCart size={18} /> Acheter ce site</button>);
      default:
        return null;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "Abonnement": return "Abonnement mensuel";
      case "Formation": return "Formation en ligne";
      case "Livre": return "E-book";
      case "Site": return "Site prêt à vendre";
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SubpageNav />
      <div className="pt-16">
        <PageHero title="Store" highlight="Digital" subtitle="Produits et services digitaux pour booster votre présence en ligne" image={heroImg} />
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {storeCategories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Chargement...</div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/40 transition-colors flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <span className="text-3xl">{product.emoji}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-1">{getCategoryLabel(product.category)}</span>
                    {product.billing_cycle && <span className="text-xs text-muted-foreground mb-2">Facturation : {product.billing_cycle}</span>}
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                    <ul className="space-y-2 mb-5">
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm"><span className="text-primary mt-0.5">✓</span><span>{f}</span></li>
                      ))}
                    </ul>
                    <div className="text-2xl font-bold text-gradient mb-4">{product.price}</div>
                    <div className="space-y-2">
                      <button onClick={() => openModal(product)} className="w-full bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                        <Eye size={16} /> Voir les détails
                      </button>
                      {getActionButton(product)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 text-center">
            <div className="bg-secondary/50 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Besoin d'un service personnalisé ?</h3>
              <p className="text-muted-foreground mb-6">Contactez-moi pour discuter de votre projet et obtenir un devis sur mesure</p>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Discutons de votre projet
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedProduct.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
                    <span className="text-xs font-semibold text-primary">{getCategoryLabel(selectedProduct.category)}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"><X size={18} /></button>
              </div>

              {selectedProduct.category === "Site" && selectedProduct.media && selectedProduct.media.length > 0 && (
                <div className="bg-secondary">
                  <img src={selectedProduct.media[mediaIdx]} alt={selectedProduct.title} className="w-full object-contain max-h-[50vh]" />
                  {selectedProduct.media.length > 1 && (
                    <div className="flex justify-center gap-3 p-3">
                      <button onClick={() => setMediaIdx((mediaIdx - 1 + selectedProduct.media!.length) % selectedProduct.media!.length)} className="p-1.5 rounded-lg bg-card"><ChevronLeft size={16} /></button>
                      <span className="text-sm text-muted-foreground self-center">{mediaIdx + 1}/{selectedProduct.media.length}</span>
                      <button onClick={() => setMediaIdx((mediaIdx + 1) % selectedProduct.media!.length)} className="p-1.5 rounded-lg bg-card"><ChevronRight size={16} /></button>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                <div>
                  <h3 className="font-bold mb-3">Ce qui est inclus</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {selectedProduct.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm"><span className="text-primary mt-0.5">✓</span><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
                {selectedProduct.chapters && (
                  <div>
                    <h3 className="font-bold mb-3">📑 Sommaire</h3>
                    <ol className="space-y-2">
                      {selectedProduct.chapters.map((ch, i) => (
                        <li key={ch} className="flex items-center gap-3 text-sm bg-secondary/50 px-4 py-2.5 rounded-xl">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>{ch}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {selectedProduct.modules && (
                  <div>
                    <h3 className="font-bold mb-3">🎯 Modules de la formation</h3>
                    <ol className="space-y-2">
                      {selectedProduct.modules.map((mod, i) => (
                        <li key={mod} className="flex items-center gap-3 text-sm bg-secondary/50 px-4 py-2.5 rounded-xl">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>{mod}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {selectedProduct.demo_url && (
                  <a href={selectedProduct.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
                    <ExternalLink size={14} /> Voir la démo en ligne
                  </a>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-3xl font-bold text-gradient">{selectedProduct.price}</div>
                  <div className="w-auto">{getActionButton(selectedProduct)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
