import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="container mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
        <Hero />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Resume />
      </main>
      <Footer />
    </div>
  );
}
