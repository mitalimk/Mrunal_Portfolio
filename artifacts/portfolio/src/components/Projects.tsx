import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Forge AI",
    tagline: "AI-Powered Resume Optimization Platform",
    tech: ["Node.js", "Express.js", "React", "Next.js", "Firebase", "Gemini API"],
    url: "#",
    description:
      "A responsive platform that enhances resumes using AI. Implements automatic extraction of key resume details. Integrates AI feedback to identify missing skills and provide improvement suggestions. Includes ForgeBot — an AI assistant for real-time resume insights and job search.",
  },
  {
    id: 2,
    title: "Wanderlust",
    tagline: "Full Stack Travel Listing Platform",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Docker", "AWS EC2", "CI/CD"],
    url: "#",
    description:
      "Responsive travel listing platform with secure authentication, role-based authorization and full CRUD functionality. Interactive maps with Leaflet.js + Nominatim API. Image uploads via Multer and Cloudinary. Containerized with Docker, pushed to Docker Hub, automated deployment to AWS EC2 using GitHub Actions with zero-downtime via PM2.",
  },
  {
    id: 3,
    title: "Accessible AI",
    tagline: "AI-Powered Accessible Content Platform",
    tech: ["React", "Next.js", "Gemini API", "ClipDrop API"],
    url: "#",
    description:
      "AI web app that simplifies text and images for diverse audiences including students, professionals, and the elderly. Integrates OpenAI GPT-4, Gemini API, and ClipDrop for content simplification, automated image captioning, and visual generation. Multi-voice text-to-speech and chatbot for content rephrasing and user assistance.",
  },
];

function ProjectCard({ project, idx }: { project: (typeof projects)[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [selected, setSelected] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        className="flex flex-col lg:flex-row gap-8 bg-card border border-border p-6 rounded-xl glow-border group"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        whileHover={{ y: -4 }}
        data-testid={`card-project-${project.id}`}
      >
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <a
                href={project.url}
                className="text-muted-foreground hover:text-primary transition-colors p-2 bg-secondary rounded-full"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="font-mono text-sm text-primary mb-4">{project.tagline}</p>
            <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="font-mono bg-background text-foreground border-border">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <button
            onClick={() => setSelected(true)}
            className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors px-4 py-2 border border-border rounded-md hover:border-primary w-fit"
          >
            <Info size={16} />
            View Details
          </button>
        </div>

        <div className="flex-1 bg-black/50 border border-border rounded-lg overflow-hidden flex flex-col">
          <div className="bg-secondary/50 border-b border-border p-2 flex items-center gap-2">
            <div className="flex gap-1.5 pl-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
            </div>
            <div className="mx-auto bg-background/50 border border-border rounded text-xs font-mono px-3 py-1 text-muted-foreground/80 flex-1 max-w-[200px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {project.url !== "#" ? project.url : `${project.title.toLowerCase().replace(" ", "-")}.local`}
            </div>
          </div>
          <div className="flex-1 relative min-h-[250px] bg-background flex items-center justify-center">
            {project.url !== "#" ? (
              <iframe src={project.url} className="w-full h-full border-none" title={project.title} />
            ) : (
              <div className="text-center p-6">
                <Code2 size={48} className="mx-auto text-primary/20 mb-4" />
                <h4 className="font-mono text-lg text-muted-foreground mb-2">{project.title}</h4>
                <p className="font-mono text-xs text-primary/60 border border-primary/20 bg-primary/5 px-2 py-1 rounded inline-block">
                  No Preview Available
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={selected} onOpenChange={() => setSelected(false)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              {project.title}
              <a href={project.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={20} />
              </a>
            </DialogTitle>
            <DialogDescription className="font-mono text-primary text-sm mt-1">{project.tagline}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            <div className="mt-6">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono glow-border">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false });

  return (
    <section id="projects" className="scroll-mt-24">
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 04.</span>projects
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="grid gap-12">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}
