import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
}

const PageHero = ({ title, highlight, subtitle, image }: PageHeroProps) => (
  <div className="relative h-64 md:h-80 overflow-hidden">
    <img
      src={image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-extrabold mb-3"
      >
        {title} <span className="text-gradient">{highlight}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    </div>
  </div>
);

export default PageHero;
