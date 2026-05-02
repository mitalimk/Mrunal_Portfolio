import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Trophy, ZoomIn, Camera } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { E } from "./EditableText";
import img1 from "@assets/cer_1777730720875.jpeg";
import img2 from "@assets/geoup_1777730720884.jpeg";
import img3 from "@assets/my_1777730720885.jpeg";

const ROTATIONS = [2.5, -3.2, 1.4];

const galleryImages = [
  { src: img1, caption: "Certificate & Prize" },
  { src: img2, caption: "Team Photo" },
  { src: img3, caption: "WINGS 2025" },
];

function PolaroidCard({
  src,
  caption,
  index,
  onOpen,
}: {
  src: string;
  caption: string;
  index: number;
  onOpen: () => void;
}) {
  const rotate = ROTATIONS[index % ROTATIONS.length];
  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, scale: 0.7, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.1 }}
      whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
      style={{ zIndex: index }}
      onClick={onOpen}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-2 pb-8 shadow-2xl rounded-sm">
        <div className="w-full aspect-square overflow-hidden bg-gray-100">
          <img src={src} alt={caption} className="w-full h-full object-cover" />
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-2 font-mono truncate px-1">{caption}</p>
      </div>

      {/* Hover zoom overlay */}
      <div className="absolute inset-2 bottom-8 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-sm">
        <ZoomIn size={22} className="text-white" />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false });
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, margin: "-60px" });
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: false, margin: "-60px" });

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="achievements" className="scroll-mt-24">
      {/* Heading */}
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 05.</span>
          <E id="achievements-heading">achievements</E>
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* WINGS Winner hero card */}
      <div ref={cardRef}>
        <motion.div
          className="relative bg-card border border-primary/40 rounded-2xl p-8 md:p-10 overflow-hidden mb-14"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ boxShadow: cardInView ? "0 0 40px rgba(233,99,166,0.12), inset 0 0 40px rgba(233,99,166,0.04)" : "none" }}
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary rounded-br-2xl" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(233,99,166,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0, rotate: -30 }}
              animate={cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-primary/30"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7 }}
                  />
                ))}
                <div
                  className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
                  style={{ boxShadow: "0 0 30px rgba(233,99,166,0.3)" }}
                >
                  <Trophy size={40} className="text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-xs text-primary/70 mb-2 tracking-wider">
                <E id="achievement-badge">NATIONAL LEVEL — FIRST PLACE</E>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                <E id="achievement-title">WINGS Hackathon – Winner</E>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed max-w-lg">
                <E id="achievement-desc">
                  Won the WINGS national-level hackathon, competing against teams from across India. Recognized for outstanding innovation and technical execution.
                </E>
              </p>
              <span className="inline-block text-sm bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full">
                <E id="achievement-date">February 2025</E>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Polaroid Collage Gallery */}
      <div ref={galleryRef}>
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Camera size={18} className="text-primary" />
          <h4 className="text-base font-semibold text-foreground">
            <E id="gallery-title">Memory Board</E>
          </h4>
          <span className="text-xs text-muted-foreground">
            — <E id="gallery-subtitle">certificates &amp; snapshots</E>
          </span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-4">
          <AnimatePresence>
            {galleryImages.map((img, idx) => (
              <PolaroidCard
                key={idx}
                src={img.src}
                caption={img.caption}
                index={idx}
                onOpen={() => setLightboxSrc(img.src)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxSrc} onOpenChange={() => setLightboxSrc(null)}>
        <DialogContent className="max-w-3xl bg-card border-border p-3">
          <div className="bg-white p-3 pb-10 shadow-inner rounded-sm">
            {lightboxSrc && (
              <img src={lightboxSrc} alt="Memory" className="w-full h-auto max-h-[75vh] object-contain" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
