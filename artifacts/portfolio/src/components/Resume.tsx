import { motion } from "framer-motion";
import { Download, Maximize2 } from "lucide-react";
import resumePdf from "@assets/Mrunal_Kulkarni_Resume_1777716565727.pdf";

export default function Resume() {
  return (
    <motion.section
      id="resume"
      className="scroll-mt-24 mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <h2 className="text-3xl font-bold flex items-center font-mono">
          <span className="text-primary mr-3 text-xl">// 06.</span>
          resume
        </h2>
        <div className="flex gap-4">
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-md font-mono text-sm hover:border-primary hover:text-primary transition-colors"
          >
            <Maximize2 size={16} />
            Open Full Screen
          </a>
          <a
            href={resumePdf}
            download
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm font-semibold hover:bg-primary/90 transition-colors glow-border"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>

      <div className="w-full bg-card border border-border rounded-xl overflow-hidden shadow-xl h-[70vh] md:h-[800px] relative glow-border">
        {/* Browser Chrome style top bar */}
        <div className="bg-secondary/80 border-b border-border p-3 flex items-center gap-2">
          <div className="flex gap-2 pl-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <div className="mx-auto bg-background border border-border rounded text-xs font-mono px-4 py-1.5 text-muted-foreground flex-1 max-w-sm text-center">
            Mrunal_Kulkarni_Resume.pdf
          </div>
        </div>
        
        <div className="w-full h-[calc(100%-3rem)] bg-muted/20">
          <iframe
            src={`${resumePdf}#toolbar=0`}
            className="w-full h-full border-none"
            title="Resume PDF"
          />
        </div>
      </div>
    </motion.section>
  );
}
