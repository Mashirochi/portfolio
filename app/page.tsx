import AboutSection from "./components/homepage/about";
import HeroSection from "./components/homepage/hero-section";
import Experience from "./components/homepage/experience";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Education from "./components/homepage/education";
import Blog from "./components/homepage/blog";
export default async function Home() {
  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Education />
      <ContactSection />
      <Blog />
    </div>
  )
};