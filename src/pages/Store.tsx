import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const storeCategories = ["All", "Site", "Abonnement", "Livre", "Formation"] as const;
type StoreCat = (typeof storeCategories)[number];

interface Product {
  id: number;
  title: string;
  desc: string;
  price: string;
  category: StoreCat;
  emoji: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Site Vitrine Pro",
    desc: "Site web professionnel avec design moderne, responsive et optimisé SEO.",
    price: "À partir de 500€",
    category: "Site",
    emoji: "💻",
    features: ["Design sur mesure", "Responsive mobile", "Optimisé SEO", "Hébergement 1 an"],
  },
  {
    id: 2,
    title: "Site E-commerce",
    desc: "Boutique en ligne complète avec gestion de produits, paiement et livraison.",
    price: "À partir de 900€",
    category: "Site",
    emoji: "🛒",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion des commandes", "Dashboard admin"],
  },
  {
    id: 3,
    title: "Community Management",
    desc: "Gestion complète de vos réseaux sociaux avec stratégie et contenu.",
    price: "400€/mois",
    category: "Abonnement",
    emoji: "📱",
    features: ["Stratégie de contenu", "Publications quotidiennes", "Rapport mensuel", "Gestion communauté"],
  },
  {
    id: 4,
    title: "Pack Identité Visuelle",
    desc: "Logo professionnel et charte graphique complète pour votre marque.",
    price: "À partir de 300€",
    category: "Abonnement",
    emoji: "🎨",
    features: ["Logo vectoriel", "Charte graphique", "Fichiers sources", "3 propositions"],
  },
  {
    id: 5,
    title: "E-book : Réussir en Digital",
    desc: "Guide complet pour lancer et développer votre activité en ligne.",
    price: "19€",
    category: "Livre",
    emoji: "📖",
    features: ["120+ pages", "Études de cas", "Modèles inclus", "Mises à jour gratuites"],
  },
  {
    id: 6,
    title: "E-book : Branding 101",
    desc: "Apprenez à créer une identité de marque forte et mémorable.",
    price: "15€",
    category: "Livre",
    emoji: "📕",
    features: ["80+ pages", "Templates inclus", "Checklist branding", "Exemples concrets"],
  },
  {
    id: 7,
    title: "Formation Dev Web",
    desc: "Formation complète pour apprendre le développement web de A à Z.",
    price: "199€",
    category: "Formation",
    emoji: "🎓",
    features: ["40h de contenu", "Projets pratiques", "Certificat", "Accès à vie"],
  },
  {
    id: 8,
    title: "Formation Design",
    desc: "Maîtrisez les outils de design et créez des visuels professionnels.",
    price: "149€",
    category: "Formation",
    emoji: "🖌️",
    features: ["30h de contenu", "Exercices pratiques", "Ressources incluses", "Support communauté"],
  },
];

const Store = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<StoreCat>("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

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
              <span className="text-gradient">Store</span> Digital
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Produits et services digitaux pour booster votre présence en ligne
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {storeCategories.map((cat) => (
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

          {/* Products Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-7 hover:border-primary/40 transition-colors flex flex-col"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <span className="text-3xl">{product.emoji}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-3">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{product.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-2xl font-bold text-gradient mb-4">{product.price}</div>
                  <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <ShoppingCart size={18} /> Commander
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="bg-secondary/50 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Besoin d'un service personnalisé ?</h3>
              <p className="text-muted-foreground mb-6">
                Contactez-moi pour discuter de votre projet et obtenir un devis sur mesure
              </p>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Discutons de votre projet
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Store;
