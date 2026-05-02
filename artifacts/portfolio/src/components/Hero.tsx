import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";
import profileImg from "@assets/profile_nobg.png";
import { E } from "./EditableText";

const roles = ["Full-Stack Developer", "DevOps Enthusiast"];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === currentRole) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? prev.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <motion.section
      id="about"
      className="min-h-[90vh] flex flex-col justify-center relative pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-primary mb-4 text-lg tracking-wider">
            <E id="hero-greeting">Hello, World! I am</E>
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground glow-green tracking-tight">
            <E id="hero-name">Mrunal Kulkarni</E>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 flex items-center min-h-[2.5rem]">
            <span className="text-primary/80">&gt;</span>
            <span className="ml-3">{displayedText}</span>
            <span className="w-[3px] h-7 bg-primary ml-1 animate-pulse" />
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            <E id="hero-bio">
              B.Tech CSE student at MIT Chhatrapati Sambhajinagar, building scalable full-stack applications with modern DevOps practices.
            </E>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground mb-8">
            <E id="hero-email" as="a" className="hover:text-primary transition-colors">
              mrunalkulkarni160170@gmail.com
            </E>
            <span className="hidden sm:inline text-primary">|</span>
            <E id="hero-phone" as="a" className="hover:text-primary transition-colors">
              +91 9960560170
            </E>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href={resumePdf}
              download
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors glow-border"
              data-testid="button-download-resume"
            >
              <Download size={18} />
              Download Resume
            </a>
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 border border-primary text-primary font-bold rounded-md hover:bg-primary/10 transition-colors"
              data-testid="button-view-projects"
            >
              View Projects
            </button>
            <div className="flex gap-3 ml-2">
              <a
                href="https://github.com/mitalimk?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border rounded-md hover:border-primary"
                data-testid="link-github"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border rounded-md hover:border-primary"
                data-testid="link-linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          className="flex-shrink-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="relative flex items-end justify-center"
            style={{ width: "280px", height: "340px" }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Large pink glow bloom behind figure */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(233,99,166,0.28) 0%, rgba(233,99,166,0.08) 55%, transparent 75%)" }}
            />

            {/* Decorative base ring */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-primary/20 pointer-events-none"
              style={{ width: "200px", height: "20px", background: "radial-gradient(ellipse, rgba(233,99,166,0.18) 0%, transparent 70%)" }}
            />

            {/* The figure — transparent PNG on dark bg */}
            <img
              src={profileImg}
              alt="Mrunal Kulkarni"
              className="relative z-10 h-full w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 18px rgba(233,99,166,0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))" }}
            />

            {/* Floating code badge top-right */}
            <motion.div
              className="absolute top-4 -right-4 bg-card border border-primary/50 rounded-lg px-3 py-1.5 text-xs text-primary shadow-xl z-20"
              animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &lt;/code&gt;
            </motion.div>

            {/* Floating tech badge top-left */}
            <motion.div
              className="absolute top-16 -left-6 bg-card border border-primary/30 rounded-lg px-2.5 py-1 text-[11px] text-muted-foreground shadow-lg z-20 flex items-center gap-1.5"
              animate={{ rotate: [1, -1, 1], y: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Full Stack Dev
            </motion.div>

            {/* Floating year badge bottom-right */}
            <motion.div
              className="absolute bottom-8 -right-5 bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-bold shadow-xl z-20"
              animate={{ rotate: [2, -1, 2], y: [0, 4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              CSE 2026
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-muted-foreground hover:text-primary transition-colors"
        onClick={scrollToProjects}
      >
        <ChevronDown size={28} />
      </div>
    </motion.section>
  );
}
