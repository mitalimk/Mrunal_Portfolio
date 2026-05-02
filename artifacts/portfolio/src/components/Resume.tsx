import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink, FileText, Lock, Unlock } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";

const LOG_LINES = [
  { delay: 0,    text: "$ access --file resume.pdf --user visitor", color: "text-muted-foreground" },
  { delay: 600,  text: "> Initializing secure connection...",        color: "text-muted-foreground/70" },
  { delay: 1100, text: "> Verifying credentials...",                 color: "text-muted-foreground/70" },
  { delay: 2200, text: "> Access granted.",                          color: "text-primary" },
  { delay: 2700, text: "> File: Mrunal_Kulkarni_Resume.pdf",         color: "text-muted-foreground/70" },
];

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [visibleLogs, setVisibleLogs] = useState(0);

  useEffect(() => {
    if (!isInView || phase !== "idle") return;
    setPhase("loading");

    // Animate progress bar
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

    // Reveal log lines
    LOG_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLogs(i + 1), line.delay);
    });

    return () => clearInterval(interval);
  }, [isInView, phase]);

  return (
    <section id="resume" ref={sectionRef} className="scroll-mt-24 mb-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 06.</span>
          resume
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <motion.div
        className="relative bg-card border border-border rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ boxShadow: "0 0 40px rgba(74,222,128,0.08), inset 0 0 40px rgba(74,222,128,0.03)" }}
      >
        {/* Terminal top bar */}
        <div className="bg-secondary/70 border-b border-border px-5 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="font-mono text-xs text-muted-foreground ml-2 flex items-center gap-2">
            <FileText size={12} className="text-primary" />
            <span>resume_access.sh</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="px-6 md:px-10 py-8">
          {/* Log output */}
          <div className="font-mono text-sm mb-6 space-y-1 min-h-[7rem]">
            {LOG_LINES.slice(0, visibleLogs).map((line, i) => (
              <motion.div
                key={i}
                className={`${line.color} flex items-center gap-2`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {i === 3 ? (
                  <Unlock size={12} className="text-primary flex-shrink-0" />
                ) : i === 0 ? null : (
                  <Lock size={12} className="text-muted-foreground/40 flex-shrink-0" />
                )}
                <span>{line.text}</span>
              </motion.div>
            ))}

            {/* Blinking cursor when still loading */}
            {phase === "loading" && (
              <div className="flex items-center gap-1 text-primary/60">
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="font-mono"
                >
                  _
                </motion.span>
              </div>
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
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* CTA — visible after load */}
          <AnimatedCTA show={phase === "done"} resumePdf={resumePdf} />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedCTA({ show, resumePdf }: { show: boolean; resumePdf: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col md:flex-row items-start md:items-center gap-8"
    >
      {/* Left: question text */}
      <div className="flex-1">
        <motion.p
          className="font-mono text-primary text-sm mb-1"
          animate={show ? { opacity: [0, 1] } : {}}
          transition={{ delay: 0.1 }}
        >
          &gt; resume.pdf — ready
        </motion.p>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Wanna peek at{" "}
          <span className="text-primary glow-green">my resume?</span>
        </h3>
        <p className="text-muted-foreground text-sm font-mono">
          Open it in your browser or download a local copy.
        </p>
      </div>

      {/* Right: action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <a
          href={resumePdf}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-lg hover:bg-primary/90 transition-all glow-border group"
          data-testid="button-view-resume"
        >
          <ExternalLink size={17} className="group-hover:translate-x-0.5 transition-transform" />
          View Resume
        </a>
        <a
          href={resumePdf}
          download
          className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-mono font-semibold rounded-lg hover:bg-primary/10 transition-colors"
          data-testid="button-download-resume-section"
        >
          <Download size={17} />
          Download
        </a>
      </div>
    </motion.div>
  );
}
