import AboutSection from "@/components/homepage/about";
import Blog from "@/components/homepage/blog";
import ContactSection from "@/components/homepage/contact";
import Education from "@/components/homepage/education";
import Experience from "@/components/homepage/experience";
import HeroSection from "@/components/homepage/hero-section";
import Skills from "@/components/homepage/skills";

import dbConnect from "@/utils/db";
import { PersonalData } from "@/utils/models/personal-data";
import { Experience as ExperienceModel } from "@/utils/models/experience";
import { Education as EducationModel } from "@/utils/models/education";
import { Project } from "@/utils/models/project";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  await dbConnect();

  // Fetch data directly in the Server Component
  const personalDataDoc = await PersonalData.findOne();
  const experiencesDocs = await ExperienceModel.find().sort({ order: 1 });
  const educationsDocs = await EducationModel.find().sort({ order: 1 });
  const projectsDocs = await Project.find().sort({ order: 1 });

  // Convert to plain objects
  const personalData = personalDataDoc
    ? JSON.parse(JSON.stringify(personalDataDoc))
    : null;
  const experiences = JSON.parse(JSON.stringify(experiencesDocs));
  const educations = JSON.parse(JSON.stringify(educationsDocs));
  const projects = JSON.parse(JSON.stringify(projectsDocs));

  return (
    <div suppressHydrationWarning>
      <HeroSection personalData={personalData} locale={locale} />
      <AboutSection personalData={personalData} locale={locale} />
      <Skills />
      <Experience experiences={experiences} locale={locale} />
      <Education educations={educations} locale={locale} />
      <Blog projects={projects} locale={locale} />
      <ContactSection personalData={personalData} locale={locale} />
    </div>
  );
}
