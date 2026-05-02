import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    institution: "Maharashtra Institute of Technology",
    location: "Chhatrapati Sambhajinagar, India",
    degree: "Bachelor of Technology – CSE",
    score: "CGPA: 8.97",
    date: "Jan 2026",
    icon: "B.Tech",
  },
  {
    institution: "CSMSS College of Polytechnic",
    location: "Chhatrapati Sambhajinagar, India",
    degree: "Diploma – Computer Engineering",
    score: "90.46%",
    date: "June 2023",
    icon: "Dip.",
  },
  {
    institution: "Holy Cross English High School",
    location: "Chhatrapati Sambhajinagar, India",
    degree: "X (State Board)",
    score: "86.57%",
    date: "August 2020",
    icon: "SSC",
  },
];

function EducationCard({ edu, index }: { edu: (typeof educationData)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-6 group">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative z-10 w-12 h-12 rounded-xl bg-card border-2 border-primary flex items-center justify-center font-mono text-primary text-xs font-bold flex-shrink-0"
          initial={{ scale: 0, rotate: -90 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
          transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 200 }}
          style={{ boxShadow: isInView ? "0 0 20px rgba(233,99,166,0.4)" : "none" }}
        >
          {edu.icon}
        </motion.div>
        {index < educationData.length - 1 && (
          <motion.div
            className="w-px bg-gradient-to-b from-primary/60 to-primary/10 mt-2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            style={{ height: "calc(100% - 3rem)", transformOrigin: "top" }}
          />
        )}
      </div>

      <motion.div
        className="flex-1 mb-8 bg-card border border-border rounded-xl p-6 relative overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0 round 12px)", opacity: 0.5 }}
        animate={isInView
          ? { clipPath: "inset(0 0% 0 0 round 12px)", opacity: 1 }
          : { clipPath: "inset(0 100% 0 0 round 12px)", opacity: 0.5 }}
        transition={{ duration: 0.65, delay: index * 0.18, ease: [0.77, 0, 0.175, 1] }}
        whileHover={{ y: -4, boxShadow: "0 0 24px rgba(233,99,166,0.18)" }}
      >
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary/80 via-primary to-primary/10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.5 }}
          style={{ transformOrigin: "left", width: "100%" }}
        />

        {isInView && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(233,99,166,0.07) 50%, transparent 100%)",
              height: "60px",
            }}
            initial={{ y: -60 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.55, delay: index * 0.18 + 0.1, ease: "linear" }}
          />
        )}

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className="text-primary flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground leading-tight">{edu.degree}</h3>
            </div>
            <p className="text-muted-foreground font-medium">{edu.institution}</p>
            <p className="text-muted-foreground/60 text-sm font-mono mt-0.5">{edu.location}</p>
          </div>
          <div className="flex flex-col items-start md:items-end font-mono text-sm gap-1 flex-shrink-0">
            <motion.span
              className="text-primary font-bold text-base"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.18 + 0.6 }}
            >
              {edu.score}
            </motion.span>
            <span className="text-muted-foreground bg-secondary px-2 py-0.5 rounded text-xs">{edu.date}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false });

  return (
    <section id="education" className="scroll-mt-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 01.</span>education
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
      <div className="pl-0 sm:pl-2">
        {educationData.map((edu, index) => (
          <EducationCard key={edu.institution} edu={edu} index={index} />
        ))}
      </div>
    </section>
  );
}
