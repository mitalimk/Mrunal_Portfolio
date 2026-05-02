import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-8 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
        
        <div className="text-center font-mono text-sm text-muted-foreground">
          <p className="mb-2">
            <span className="text-primary">&gt;</span> Built by Mrunal Kulkarni
          </p>
          <p className="opacity-60">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
