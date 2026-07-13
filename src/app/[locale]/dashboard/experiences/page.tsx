import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/db";
import { Experience } from "@/utils/models/experience";
import { redirect } from "@/i18n/routing";
import ExperiencesClient from "@/components/dashboard/experiences/ExperiencesClient";

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions);
  const locale = (await params).locale;

  if (!session) {
    redirect({ href: "/login", locale });
  }

  await dbConnect();
  
  // Fetch existing data
  let experiences = await Experience.find().sort({ order: 1 });

  // Auto-seed data if database is empty
  if (experiences.length === 0) {
    const { experiences: localExperiences } = await import("@/utils/data/experience");
    const seedData = localExperiences.map((exp: any) => ({
      vi_title: exp.title || "",
      en_title: exp.title || "",
      vi_company: exp.company || "",
      en_company: exp.company || "",
      vi_duration: exp.duration || "",
      en_duration: exp.duration || "",
      order: exp.id || 0,
    }));
    await Experience.insertMany(seedData as any);
    experiences = await Experience.find().sort({ order: 1 });
  }

  // Map to plain objects so it can be passed to Client Component
  const displayData = experiences.map((exp) => {
    const doc = exp.toObject ? exp.toObject() : exp;
    return { ...doc, _id: doc._id.toString() };
  });

  return <ExperiencesClient initialData={displayData} />;
}
