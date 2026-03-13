import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import photoSedgo from "@/assets/photo-sedgo.jpg";

const badges = [
  { emoji: "💻", label: "Développeur" },
  { emoji: "📱", label: "Community Manager" },
  { emoji: "🎨", label: "Designer" },
];

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "var(--gradient-glow)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/40 glow-purple"
          >
            <img src={photoSedgo} alt="Coach Fema" className="w-full h-full object-cover" />
          </motion.div>

          {badges.map((badge, i) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className={`absolute bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border animate-float ${
                i === 0 ? "-left-16 top-8" : i === 1 ? "-right-20 bottom-8" : "right-0 -top-2"
              }`}
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {badge.emoji} {badge.label}
            </motion.span>
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary text-secondary-foreground text-sm px-4 py-1.5 rounded-full mb-6"
        >
          Hello 👋
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          Je suis <span className="text-gradient">Coach Fema</span>,{" "}
          Architecte de Solutions <span className="text-gradient">Digitales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
        >
          Développeur, Community Manager et Designer — j'accompagne entrepreneurs et marques dans la création de leur présence digitale complète et impactante.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Découvrir mes projets <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary transition-colors"
          >
            Travailler avec moi
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
