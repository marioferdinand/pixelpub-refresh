export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "clarifier-offre-digitale",
    title: "Comment clarifier votre offre digitale en 5 étapes",
    excerpt: "Une offre floue repousse les prospects. Voici comment structurer votre message pour convertir dès la première visite.",
    category: "Stratégie",
    readTime: "4 min",
    date: "2025-03-10",
  },
  {
    slug: "branding-coherent",
    title: "Pourquoi un branding cohérent change tout",
    excerpt: "Logo, couleurs, ton : découvrez pourquoi la cohérence visuelle renforce la crédibilité et la confiance de vos clients.",
    category: "Design",
    readTime: "3 min",
    date: "2025-02-28",
  },
  {
    slug: "reseaux-sociaux-strategie",
    title: "Réseaux sociaux : publier sans stratégie ne sert à rien",
    excerpt: "Poster tous les jours ne suffit pas. Apprenez à structurer un calendrier éditorial qui génère de vrais résultats.",
    category: "Community Management",
    readTime: "5 min",
    date: "2025-02-15",
  },
  {
    slug: "site-web-qui-convertit",
    title: "Les 3 erreurs qui tuent la conversion de votre site",
    excerpt: "Un beau site ne convertit pas forcément. Voici les erreurs les plus fréquentes et comment les corriger rapidement.",
    category: "Développement",
    readTime: "4 min",
    date: "2025-01-30",
  },
];
