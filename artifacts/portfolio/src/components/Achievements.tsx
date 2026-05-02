import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Trophy, Plus, X, ZoomIn, Images } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Achievements() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });

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

  return (
    <section id="achievements" className="scroll-mt-24">
      {/* Section header */}
      <div ref={headingRef} className="mb-12">
        <motion.h2
          className="text-3xl font-bold flex items-center font-mono mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary mr-3 text-xl">// 05.</span>
          achievements
        </motion.h2>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* WINGS Winner — hero card */}
      <div ref={cardRef}>
        <motion.div
          className="relative bg-card border border-primary/40 rounded-2xl p-8 md:p-10 overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ boxShadow: cardInView ? "0 0 40px rgba(74,222,128,0.12), inset 0 0 40px rgba(74,222,128,0.04)" : "none" }}
        >
          {/* Animated corner beams */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary rounded-br-2xl" />

          {/* Background glow blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Trophy icon with pulse rings */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0, rotate: -30 }}
              animate={cardInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Pulse rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-primary/30"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.7,
                    }}
                  />
                ))}
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
                  style={{ boxShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
                  <Trophy size={40} className="text-primary" />
                </div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 }}
            >
              <div className="font-mono text-xs text-primary/70 mb-2 tracking-wider">
                NATIONAL LEVEL — FIRST PLACE
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                WINGS Hackathon – Winner
              </h3>
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

      {/* Photo / Certificate Gallery */}
      <div ref={galleryRef} className="mt-10">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={galleryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Images size={18} className="text-primary" />
          <h4 className="font-mono text-base font-semibold text-foreground">
            Achievement Gallery
          </h4>
          <span className="font-mono text-xs text-muted-foreground">
            — certificates &amp; memories
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
        >
          {/* Existing images */}
          <AnimatePresence>
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden border border-border group cursor-pointer"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 18px rgba(74,222,128,0.2)" }}
                onClick={() => setLightboxSrc(src)}
                data-testid={`achievement-image-${idx}`}
              >
                <img
                  src={src}
                  alt={`Achievement ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn size={24} className="text-primary" />
                </div>
                {/* Remove button */}
                <button
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 border border-border text-muted-foreground hover:text-red-400 hover:border-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  data-testid={`remove-achievement-image-${idx}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add image slot */}
          <motion.button
            className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary group"
            variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => fileInputRef.current?.click()}
            data-testid="button-add-achievement-image"
          >
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plus size={28} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="font-mono text-xs opacity-60 group-hover:opacity-100 transition-opacity text-center px-2 leading-tight">
              Add Photo
            </span>
          </motion.button>
        </motion.div>

        {galleryImages.length === 0 && (
          <p className="font-mono text-xs text-muted-foreground/50 mt-3 ml-1">
            Click the + button to add certificates or achievement photos
          </p>
        )}
      </div>

      {/* Hidden file input */}
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
        <DialogContent className="max-w-3xl bg-card border-border p-2">
          <div className="relative rounded-lg overflow-hidden">
            {lightboxSrc && (
              <img
                src={lightboxSrc}
                alt="Achievement"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
