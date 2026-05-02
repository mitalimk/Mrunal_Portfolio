import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST API Development"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose", "SQL"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "AWS EC2", "Git", "GitHub", "CI/CD"],
  },
  {
    title: "Languages",
    skills: ["Java (OOP)", "Python"],
  },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-10 flex items-center font-mono">
        <span className="text-primary mr-3 text-xl">// 03.</span>
        skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            className="bg-card border border-border p-6 rounded-lg relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            {/* Decorative tech dashboard UI elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary animate-pulse delay-75" />
            </div>

            <h3 className="text-lg font-mono font-semibold text-primary mb-4">
              <span className="opacity-50 mr-2">&lt;</span>
              {category.title}
              <span className="opacity-50 ml-2">/&gt;</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default glow-border"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
