import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Trophy, Plus, X, ZoomIn, Camera } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ROTATIONS = [2.5, -3.2, 1.4, -2.1, 3.0, -1.8, 2.2, -2.8, 1.1, -3.5];

function PolaroidCard({
  src,
  index,
  onRemove,
  onOpen,
}: {
  src: string;
  index: number;
  onRemove: () => void;
  onOpen: () => void;
}) {
  const rotate = ROTATIONS[index % ROTATIONS.length];
  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, scale: 0.7, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      exit={{ opacity: 0, scale: 0.5, rotate: rotate + 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.07 }}
      whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }}
      style={{ zIndex: index }}
      onClick={onOpen}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-2 pb-7 shadow-2xl rounded-sm">
        <div className="w-full aspect-square overflow-hidden bg-gray-100">
          <img src={src} alt={`Memory ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Hover overlay on image */}
      <div className="absolute inset-2 bottom-7 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-sm">
        <ZoomIn size={22} className="text-white" />
      </div>
      {/* Remove button */}
      <button
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-red-500"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
      >
        <X size={11} />
      </button>
    </motion.div>
  );
}

function EmptyPolaroid({ index, onClick }: { index: number; onClick: () => void }) {
  const rotate = ROTATIONS[(index + 4) % ROTATIONS.length];
  return (
    <motion.div
      className="cursor-pointer group"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: index * 0.05 }}
      onClick={onClick}
      style={{ zIndex: index }}
    >
      <div className="bg-white/5 border-2 border-dashed border-primary/25 p-2 pb-7 rounded-sm hover:border-primary/60 transition-colors">
        <div className="w-full aspect-square flex flex-col items-center justify-center bg-primary/5 rounded-sm">
          <Camera size={22} className="text-primary/40 group-hover:text-primary/70 transition-colors mb-1" />
          <span className="font-mono text-[9px] text-primary/40 group-hover:text-primary/60 transition-colors text-center leading-tight px-1">
            add photo
          </span>
        </div>
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

  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("portfolio-achievement-images");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const updated = [...galleryImages, dataUrl];
      setGalleryImages(updated);
      try { localStorage.setItem("portfolio-achievement-images", JSON.stringify(updated)); } catch {}
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    try { localStorage.setItem("portfolio-achievement-images", JSON.stringify(updated)); } catch {}
  };

  const emptySlots = Math.max(0, 4 - galleryImages.length);

  return (
    <section id="achievements" className="scroll-mt-24">
      {/* Section header */}
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 05.</span>achievements
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
          {/* Corner brackets */}
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
              <div className="font-mono text-xs text-primary/70 mb-2 tracking-wider">NATIONAL LEVEL — FIRST PLACE</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">WINGS Hackathon – Winner</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed max-w-lg">
                Won the WINGS national-level hackathon, competing against teams from across India. Recognized for outstanding innovation and technical execution.
              </p>
              <span className="inline-block font-mono text-sm bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full">
                February 2025
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
          <h4 className="font-mono text-base font-semibold text-foreground">Memory Board</h4>
          <span className="font-mono text-xs text-muted-foreground">— certificates &amp; snapshots</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="ml-auto flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
            data-testid="button-add-achievement-image"
          >
            <Plus size={12} /> Add Photo
          </button>
        </motion.div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
          <AnimatePresence>
            {galleryImages.map((src, idx) => (
              <PolaroidCard
                key={`img-${idx}`}
                src={src}
                index={idx}
                onRemove={() => removeImage(idx)}
                onOpen={() => setLightboxSrc(src)}
              />
            ))}
          </AnimatePresence>

          {/* Empty placeholder polaroids */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <EmptyPolaroid
              key={`empty-${i}`}
              index={i}
              onClick={() => fileInputRef.current?.click()}
            />
          ))}
        </div>

        <motion.p
          className="font-mono text-xs text-muted-foreground/40 mt-4 ml-1"
          initial={{ opacity: 0 }}
          animate={galleryInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {galleryImages.length === 0
            ? "Click any frame or the Add Photo button to upload certificates and memories"
            : `${galleryImages.length} photo${galleryImages.length !== 1 ? "s" : ""} — click to view, hover for remove`}
        </motion.p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={addImage}
        data-testid="input-achievement-image"
      />

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
