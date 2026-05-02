import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Github, Linkedin, Camera, Code2 } from "lucide-react";
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
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    try { return localStorage.getItem("portfolio-profile-image"); } catch { return null; }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setProfileImage(dataUrl);
      try { localStorage.setItem("portfolio-profile-image", dataUrl); } catch {}
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

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
        {/* Left: Text Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="font-mono text-primary mb-4 text-lg tracking-wider">Hello, World! I am</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground glow-green tracking-tight">
            Mrunal Kulkarni
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 flex items-center min-h-[2.5rem]">
            <span className="font-mono text-primary/80">&gt;</span>
            <span className="ml-3">{displayedText}</span>
            <span className="w-[3px] h-7 bg-primary ml-1 animate-pulse" />
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            B.Tech CSE student at MIT Chhatrapati Sambhajinagar, building scalable full-stack applications with modern DevOps practices.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 font-mono text-sm text-muted-foreground mb-8">
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
              data-testid="button-download-resume"
            >
              <Download size={18} />
              Download Resume
            </a>
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 border border-primary text-primary font-mono font-semibold rounded-md hover:bg-primary/10 transition-colors"
              data-testid="button-view-projects"
            >
              View Projects
            </button>
            <div className="flex gap-3 ml-2">
              <a
                href="https://github.com"
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

        {/* Right: Profile Image Frame */}
        <motion.div
          className="flex-shrink-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            {/* Outer spinning dashed ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"
              style={{ borderSpacing: "8px" }}
            />
            {/* Static inner ring */}
            <div className="absolute inset-3 rounded-full border border-primary/20" />
            {/* Corner accent dots */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-50%) translateX(-50%) translateY(-6.5rem)`,
                  marginTop: "-5px",
                  marginLeft: "-5px",
                }}
              />
            ))}

            {/* Clickable image area */}
            <div
              className="absolute inset-5 rounded-full overflow-hidden bg-card border-2 border-primary glow-border cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
              data-testid="profile-image-upload"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Mrunal Kulkarni"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary">
                  <Code2 size={44} className="text-primary/30 mb-2" />
                  <span className="font-mono text-[10px] text-primary/50 text-center px-2 leading-tight">
                    click to add photo
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center">
                <Camera size={28} className="text-primary mb-1.5" />
                <span className="font-mono text-xs text-primary">
                  {profileImage ? "Change Photo" : "Add Photo"}
                </span>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              data-testid="input-profile-image"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-muted-foreground hover:text-primary transition-colors"
        onClick={scrollToProjects}
      >
        <ChevronDown size={28} />
      </div>
    </motion.section>
  );
}
