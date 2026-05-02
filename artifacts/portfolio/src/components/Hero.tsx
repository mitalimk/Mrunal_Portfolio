import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";

const roles = [
  "Full-Stack Developer",
  "DevOps Enthusiast",
  "Open Source Contributor",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let typingSpeed = 100;

    if (isDeleting) {
      typingSpeed = 50;
    }

    if (!isDeleting && displayedText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
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
    const element = document.getElementById("projects");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      id="about"
      className="min-h-[80vh] flex flex-col justify-center relative pt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl">
        <p className="font-mono text-primary mb-4 text-lg">Hello, World! I am</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground glow-green tracking-tight">
          Mrunal Kulkarni
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-6 h-10 flex items-center">
          <span className="font-mono text-primary/80">&gt;</span>
          <span className="ml-3">{displayedText}</span>
          <span className="w-[3px] h-8 bg-primary ml-1 animate-pulse" />
        </h2>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
          B.Tech CSE student at MIT Chhatrapati Sambhajinagar, building scalable full-stack applications with modern DevOps practices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm text-muted-foreground mb-8">
          <a href="mailto:mrunalkulkarni160170@gmail.com" className="hover:text-primary transition-colors">
            mrunalkulkarni160170@gmail.com
          </a>
          <span className="hidden sm:inline text-primary">|</span>
          <a href="tel:+919960560170" className="hover:text-primary transition-colors">
            +91 9960560170
          </a>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={resumePdf}
            download
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-md hover:bg-primary/90 transition-colors glow-border"
          >
            <Download size={18} />
            Download Resume
          </a>
          <button
            onClick={scrollToProjects}
            className="px-6 py-3 border border-primary text-primary font-mono font-semibold rounded-md hover:bg-primary/10 transition-colors"
          >
            View Projects
          </button>
          <div className="flex gap-4 ml-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-muted-foreground hover:text-primary" onClick={scrollToProjects}>
        <ChevronDown size={32} />
      </div>
    </motion.section>
  );
}
