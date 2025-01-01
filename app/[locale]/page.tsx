import AboutSection from "app/components/homepage/about";
import Blog from "app/components/homepage/blog";
import ContactSection from "app/components/homepage/contact";
import Education from "app/components/homepage/education";
import Experience from "app/components/homepage/experience";
import HeroSection from "app/components/homepage/hero-section";
import Skills from "app/components/homepage/skills";

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