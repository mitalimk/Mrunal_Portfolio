import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, FileText } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";
import { E } from "./EditableText";

const LOG_LINES = [
  { delay: 0,    text: "$ access --file resume.pdf --user visitor" },
  { delay: 700,  text: "> Verifying credentials..." },
  { delay: 1300, text: "> Decrypting file..." },
  { delay: 2100, text: "> Access granted. File ready." },
];

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false });

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [visibleLogs, setVisibleLogs] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setPhase("idle");
      setProgress(0);
      setVisibleLogs(0);
      return;
    }
    if (phase !== "idle") return;
    setPhase("loading");

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 14) + 6;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 300);
      } else {
        setProgress(p);
      }
    }, 70);

    LOG_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLogs(i + 1), line.delay);
    });

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="resume" ref={sectionRef} className="scroll-mt-24 mb-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 06.</span>
          <E id="resume-heading">resume</E>
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <motion.div
        className="relative bg-card border border-border rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ boxShadow: "0 0 40px rgba(233,99,166,0.08), inset 0 0 40px rgba(233,99,166,0.03)" }}
      >
        {/* Terminal chrome */}
        <div className="bg-secondary/70 border-b border-border px-5 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-primary/70" />
          </div>
          <div className="text-xs text-muted-foreground ml-2 flex items-center gap-2">
            <FileText size={12} className="text-primary" />
            <span>resume_access.sh</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="px-6 md:px-10 py-8">
          {/* Log output */}
          <div className="text-sm mb-5 space-y-1.5 min-h-[6rem]">
            {LOG_LINES.slice(0, visibleLogs).map((line, i) => (
              <motion.div
                key={i}
                className={i === 3 ? "text-primary font-semibold" : "text-muted-foreground/70"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line.text}
              </motion.div>
            ))}
            {phase === "loading" && (
              <motion.span
                className="text-primary/60"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >_</motion.span>
            )}
          </div>

          {/* Progress bar */}
          {phase !== "idle" && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>loading resume.pdf</span>
                <span className="text-primary">{Math.min(progress, 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA after loading */}
          <AnimatePresence>
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-8"
              >
                <div className="flex-1">
                  <p className="text-primary text-sm mb-1">&gt; resume.pdf — ready</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
                    <E id="resume-cta-line1">Wanna peek at </E>
                    <span className="text-primary glow-green">
                      <E id="resume-cta-highlight">my resume?</E>
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    <E id="resume-cta-sub">Grab a copy below.</E>
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={resumePdf}
                    download
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all glow-border text-base"
                    data-testid="button-download-resume-section"
                  >
                    <Download size={20} />
                    Download Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
