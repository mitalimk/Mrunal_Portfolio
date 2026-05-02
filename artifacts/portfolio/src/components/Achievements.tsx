import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Image as ImageIcon, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const achievements = [
  {
    id: 1,
    title: "WINGS (National-level Hackathon) – Winner",
    date: "February 2025",
    description: "Won the WINGS national-level hackathon competing against teams from across India.",
    hasCertificate: true,
  },
  {
    id: 2,
    title: "Coordinator – Technophilia 2025 AI Hackathon",
    date: "April 2025",
    description: "Coordinated the Technophilia 2025 AI Hackathon event at MIT.",
    hasCertificate: false,
  },
  {
    id: 3,
    title: "Design Team Member – MLSC",
    date: "2024–2025",
    description: "Active member of the Design Team at Microsoft Learn Student Club.",
    hasCertificate: false,
  },
];

export default function Achievements() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <motion.section
      id="achievements"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-10 flex items-center font-mono">
        <span className="text-primary mr-3 text-xl">// 05.</span>
        achievements
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.id}
            className="bg-card border border-border p-6 rounded-lg flex flex-col justify-between glow-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight">{item.title}</h3>
              </div>
              <p className="font-mono text-sm text-primary/80 mb-3">{item.date}</p>
              <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
            </div>

            {item.hasCertificate && (
              <div 
                className="mt-auto border border-dashed border-border rounded-lg h-32 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <ImageIcon size={32} className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="font-mono text-xs">View Certificate</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          <div className="relative bg-card rounded-xl border border-border p-2">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-4 -right-4 p-2 bg-card border border-border rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="w-full aspect-video bg-muted border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon size={64} className="mb-4 opacity-20" />
              <p className="font-mono text-lg">Certificate Image Placeholder</p>
              <p className="font-mono text-xs mt-2 opacity-50">Upload actual image to display here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
