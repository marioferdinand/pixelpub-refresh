import { motion } from "framer-motion";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

const PageIntro = ({ eyebrow, title, description }: PageIntroProps) => (
  <section className="px-4 pt-28 pb-12">
    <div className="container mx-auto max-w-3xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4"
      >
        {eyebrow}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-3xl md:text-5xl font-extrabold leading-tight mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-lg max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  </section>
);

export default PageIntro;
