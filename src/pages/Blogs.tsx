import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogs";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <PageIntro
          eyebrow="Contenu"
          title="Des articles courts pour mieux piloter votre présence digitale"
          description="Design, branding, acquisition et structure d'offre: l'objectif est de rendre les décisions plus simples et plus solides."
        />

        <section className="px-4 pb-16">
          <div className="container mx-auto grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} expanded />
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container mx-auto rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-3xl font-bold">Envie d'aller plus loin ?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Si un sujet vous parle, la suite logique est d'analyser votre contexte et de le transformer en plan d'action concret.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Parler de votre projet
              </Link>
              <Link
                to="/projets"
                className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Voir les projets
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
