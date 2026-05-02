import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    prefix: "<",
    suffix: "/>",
    skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
    color: "from-green-500/10 to-green-500/5",
  },
  {
    title: "Backend",
    prefix: "fn(",
    suffix: ")",
    skills: ["Node.js", "Express.js", "REST API Development"],
    color: "from-teal-500/10 to-teal-500/5",
  },
  {
    title: "Database",
    prefix: "db.",
    suffix: "()",
    skills: ["MongoDB", "Mongoose", "SQL"],
    color: "from-cyan-500/10 to-cyan-500/5",
  },
  {
    title: "DevOps & Tools",
    prefix: "$ ",
    suffix: "",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "AWS EC2", "Git", "GitHub", "CI/CD"],
    color: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    title: "Languages",
    prefix: "//",
    suffix: "",
    skills: ["Java (OOP)", "Python"],
    color: "from-green-600/10 to-green-600/5",
  },
];

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 20 },
  },
};

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={`bg-gradient-to-br ${category.color} bg-card border border-border rounded-xl p-6 relative overflow-hidden group`}
      initial={{ opacity: 0, y: 40, rotateY: index % 2 === 0 ? -8 : 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -6, boxShadow: "0 0 28px rgba(74,222,128,0.18)" }}
      style={{ perspective: "600px" }}
    >
      {/* Animated border top */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        style={{ transformOrigin: "left", width: "100%" }}
      />

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={isInView ? { opacity: [1, 0.3, 1] } : { opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.2 }}
        />
        <span className="font-mono text-[10px] text-primary/50">active</span>
      </div>

      {/* Category header */}
      <h3 className="text-base font-mono font-semibold text-primary mb-5 flex items-center gap-1">
        <span className="opacity-50 text-sm">{category.prefix}</span>
        <span>{category.title}</span>
        {category.suffix && (
          <span className="opacity-50 text-sm">{category.suffix}</span>
        )}
      </h3>

      {/* Skill badges with cascade animation */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: index * 0.08 + 0.2,
            },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {category.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={badgeVariants}
            className="px-3 py-1 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(74,222,128,0.05)" }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="skills" className="scroll-mt-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 03.</span>
          skills
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <SkillCard key={category.title} category={category} index={idx} />
        ))}
      </div>
    </section>
  );
}
