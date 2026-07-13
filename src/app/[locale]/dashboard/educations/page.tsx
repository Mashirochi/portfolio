import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/db";
import { Education } from "@/utils/models/education";
import { redirect } from "@/i18n/routing";
import EducationsClient from "@/components/dashboard/educations/EducationsClient";
import { educations as localEducations } from "@/utils/data/educations";

export default async function EducationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions);
  const locale = (await params).locale;

  if (!session) {
    redirect({ href: "/login", locale });
  }

  await dbConnect();
  
  // Fetch existing data
  let educations = await Education.find().sort({ order: 1 });

  // Auto-seed data if database is empty
  if (educations.length === 0) {
    const seedData = localEducations.map((edu: any) => ({
      vi_title: edu.vi_title || "",
      en_title: edu.en_title || "",
      vi_duration: edu.duration || "",
      en_duration: edu.duration || "",
      vi_institution: edu.institution || "",
      en_institution: edu.institution || "",
      order: edu.id || 0,
    }));
    await Education.insertMany(seedData as any);
    educations = await Education.find().sort({ order: 1 });
  }

  // Map to plain objects so it can be passed to Client Component
  const displayData = educations.map((edu) => {
    const doc = edu.toObject ? edu.toObject() : edu;
    return { ...doc, _id: doc._id.toString() };
  });

  return <EducationsClient initialData={displayData} />;
}
