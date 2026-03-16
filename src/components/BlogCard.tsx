import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost | { slug: string; title: string; excerpt: string; category: string; read_time: string; published_at: string | null };
  index: number;
  expanded?: boolean;
}

const BlogCard = ({ post, index, expanded }: BlogCardProps) => {
  const readTime = "read_time" in post ? post.read_time : (post as any).readTime;
  const date = "published_at" in post && post.published_at ? new Date(post.published_at).toLocaleDateString("fr-FR") : ("date" in post ? (post as any).date : "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-border bg-card p-7 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{post.category}</span>
        <span className="text-xs text-muted-foreground">{readTime}</span>
        <span className="text-xs text-muted-foreground ml-auto">{date}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      {expanded && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
      )}
      <button className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mt-auto">
        Lire l'article <ArrowRight size={14} />
      </button>
    </motion.article>
  );
};

export default BlogCard;
