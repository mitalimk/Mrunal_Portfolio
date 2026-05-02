import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, FileText, ChevronDown, Eye, EyeOff } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";

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
  const [pdfOpen, setPdfOpen] = useState(false);

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
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 06.</span>resume
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Main resume card */}
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
          <div className="font-mono text-xs text-muted-foreground ml-2 flex items-center gap-2">
            <FileText size={12} className="text-primary" />
            <span>resume_access.sh</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="px-6 md:px-10 py-8">
          {/* Log output */}
          <div className="font-mono text-sm mb-5 space-y-1.5 min-h-[6rem]">
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
                className="text-primary/60 font-mono"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >_</motion.span>
            )}
          </div>

          {/* Progress bar */}
          {phase !== "idle" && (
            <div className="mb-8">
              <div className="flex justify-between font-mono text-xs text-muted-foreground mb-2">
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
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-6">
                  <div className="flex-1">
                    <p className="font-mono text-primary text-sm mb-1">&gt; resume.pdf — ready</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
                      Wanna peek at{" "}
                      <span className="text-primary glow-green">my resume?</span>
                    </h3>
                    <p className="text-muted-foreground text-sm font-mono">
                      Preview inline or grab a copy.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                      onClick={() => setPdfOpen((v) => !v)}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-lg hover:bg-primary/90 transition-all glow-border group"
                      data-testid="button-toggle-resume"
                    >
                      {pdfOpen ? <EyeOff size={17} /> : <Eye size={17} />}
                      {pdfOpen ? "Close Preview" : "Open Preview"}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${pdfOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <a
                      href={resumePdf}
                      download
                      className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-mono font-semibold rounded-lg hover:bg-primary/10 transition-colors"
                      data-testid="button-download-resume-section"
                    >
                      <Download size={17} />
                      Download
                    </a>
                    <a
                      href={resumePdf}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground font-mono text-sm rounded-lg hover:border-primary hover:text-primary transition-colors"
                      data-testid="button-open-resume"
                    >
                      <ExternalLink size={16} />
                      Full Screen
                    </a>
                  </div>
                </div>

                {/* Inline PDF accordion */}
                <AnimatePresence>
                  {pdfOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "80vh", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden rounded-xl border border-border"
                    >
                      {/* Mini browser bar inside expanded viewer */}
                      <div className="bg-secondary/60 border-b border-border px-4 py-2 flex items-center gap-2 flex-shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                        </div>
                        <div className="flex-1 max-w-xs mx-auto text-center font-mono text-xs text-muted-foreground bg-background/50 border border-border rounded px-3 py-1 truncate">
                          Mrunal_Kulkarni_Resume.pdf
                        </div>
                      </div>
                      <iframe
                        src={`${resumePdf}#toolbar=0`}
                        className="w-full border-none"
                        style={{ height: "calc(80vh - 40px)" }}
                        title="Resume PDF"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
