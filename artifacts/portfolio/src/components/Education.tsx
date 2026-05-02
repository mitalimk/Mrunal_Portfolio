import { motion } from "framer-motion";

const educationData = [
  {
    institution: "Maharashtra Institute of Technology, Chhatrapati Sambhajinagar",
    degree: "B.Tech CSE",
    score: "CGPA: 8.97",
    date: "Jan 2026",
  },
  {
    institution: "CSMSS College of Polytechnic, Chhatrapati Sambhajinagar",
    degree: "Diploma – Computer Engineering",
    score: "90.46%",
    date: "June 2023",
  },
  {
    institution: "Holy Cross English High School, Chhatrapati Sambhajinagar",
    degree: "X (State Board)",
    score: "86.57%",
    date: "August 2020",
  },
];

export default function Education() {
  return (
    <motion.section
      id="education"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-10 flex items-center font-mono">
        <span className="text-primary mr-3 text-xl">// 01.</span>
        education
      </h2>

      <div className="grid gap-6 border-l border-primary/30 pl-6 ml-4 relative">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="relative bg-card border border-border p-6 rounded-lg glow-border"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-8 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-muted-foreground mt-1">{edu.institution}</p>
              </div>
              <div className="flex flex-col items-start md:items-end font-mono text-sm">
                <span className="text-primary font-semibold">{edu.score}</span>
                <span className="text-muted-foreground mt-1">{edu.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
