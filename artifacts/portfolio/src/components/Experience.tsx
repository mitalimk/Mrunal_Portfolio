import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

const techStack = ["PostgreSQL", "Express.js", "React", "Node.js", "Git", "GitHub"];

const bullets = [
  "Working on an ERP-CRM system using the PERN stack (PostgreSQL, Express.js, React, Node.js)",
  "Developed and maintained REST APIs for QC/QA, Inventory/Stock Management, and Deployment workflows",
  "Implemented routing, middleware integration, and handled backend logic for enterprise-level operations",
  "Debugged and resolved production issues to ensure system reliability and performance",
  "Collaborated using Git/GitHub for version control and streamlined development workflows",
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 18 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="experience" ref={ref} className="scroll-mt-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 02.</span>
          experience
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Terminal-style card */}
      <motion.div
        className="rounded-xl overflow-hidden border border-border"
        initial={{ opacity: 0, y: 50, rotateX: 12 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ perspective: "800px", transformOrigin: "top" }}
      >
        {/* Terminal chrome bar */}
        <div className="bg-secondary/80 border-b border-border px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground ml-2">
            <Terminal size={12} className="text-primary" />
            <span>career.sh</span>
            <span className="text-primary/60 ml-2">— zsh</span>
          </div>
        </div>

        {/* Card body */}
        <div className="bg-card p-6 md:p-8 border-l-4 border-l-primary">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            <div>
              <div className="font-mono text-xs text-primary/70 mb-1">
                $ whoami --role
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Software Development Intern
              </h3>
              <p className="text-lg text-primary font-mono mt-1">
                JBB Technologies Pvt Ltd
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="font-mono text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-md border border-border">
                Jan 2026 – Present
              </span>
              <motion.span
                className="text-xs font-mono text-primary/70"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                ● ACTIVE
              </motion.span>
            </div>
          </motion.div>

          {/* Bullet points with stagger */}
          <div className="font-mono text-xs text-primary/60 mb-3">
            $ cat responsibilities.txt
          </div>
          <motion.ul
            className="space-y-3 text-muted-foreground mb-8"
            variants={listVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {bullets.map((point, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                variants={itemVariants}
              >
                <span className="text-primary mt-0.5 flex-shrink-0 font-mono text-sm">▹</span>
                <span className="leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech badges with stagger */}
          <div className="font-mono text-xs text-primary/60 mb-3">
            $ cat stack.json
          </div>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.7 } },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {techStack.map((tech) => (
              <motion.div key={tech} variants={badgeVariants}>
                <Badge
                  variant="outline"
                  className="font-mono text-primary border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
