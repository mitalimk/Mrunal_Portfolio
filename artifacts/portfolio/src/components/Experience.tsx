import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const techStack = ["PostgreSQL", "Express.js", "React", "Node.js", "Git", "GitHub"];

  return (
    <motion.section
      id="experience"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-10 flex items-center font-mono">
        <span className="text-primary mr-3 text-xl">// 02.</span>
        experience
      </h2>

      <div className="bg-card border border-border border-l-4 border-l-primary p-8 rounded-lg glow-border hover:border-primary/50 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Software Development Intern</h3>
            <p className="text-lg text-primary font-mono mt-1">JBB Technologies Pvt Ltd</p>
          </div>
          <span className="font-mono text-muted-foreground text-sm">Jan 2026 – Present</span>
        </div>

        <ul className="space-y-3 text-muted-foreground mb-8 list-none">
          {[
            "Working on an ERP-CRM system using the PERN stack (PostgreSQL, Express.js, React, Node.js)",
            "Developed and maintained REST APIs for QC/QA, Inventory/Stock Management, and Deployment workflows",
            "Implemented routing, middleware integration, and handled backend logic for enterprise-level operations",
            "Debugged and resolved production issues to ensure system reliability and performance",
            "Collaborated using Git/GitHub for version control and streamlined development workflows"
          ].map((point, i) => (
            <li key={i} className="flex items-start">
              <span className="text-primary mr-3 mt-1">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="font-mono text-primary border-primary/30 bg-primary/5">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
