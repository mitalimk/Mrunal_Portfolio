import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Achievements", id: "achievements" },
    { name: "Roles", id: "responsibilities" },
    { name: "Resume", id: "resume" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      let current = "";
      sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPos) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#about"
          className="font-bold text-xl text-primary glow-green"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("about");
          }}
        >
          Mrunal Kulkarni
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm transition-colors hover:text-primary ${
                activeSection === link.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="text-primary opacity-50 mr-1">//</span>
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-card border-b border-border shadow-xl">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-3 text-left text-sm border-b border-border/50 last:border-none ${
                  activeSection === link.id ? "text-primary" : "text-foreground"
                }`}
              >
                <span className="text-primary opacity-50 mr-2">//</span>
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
