import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/db";
import { PersonalData } from "@/utils/models/personal-data";
import { redirect } from "i18n/routing";
import PersonalDataClient from "./PersonalDataClient";

export default async function PersonalDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions);
  const locale = (await params).locale;

  if (!session) {
    redirect({ href: "/login", locale });
  }

  await dbConnect();
  
  // Fetch existing data
  let personalData = await PersonalData.findOne();

  // Auto-seed data if database is empty
  if (!personalData) {
    const { personalData: localPersonalData } = await import("@/utils/data/personal-data");
    personalData = await PersonalData.create({
      name: localPersonalData.name,
      profile: localPersonalData.profile,
      vi_designation: localPersonalData.designation,
      en_designation: localPersonalData.designation,
      vi_description: localPersonalData.description,
      en_description: localPersonalData.description,
      email: localPersonalData.email,
      phone: localPersonalData.phone,
      vi_address: localPersonalData.address,
      en_address: localPersonalData.address,
      github: localPersonalData.github,
      facebook: localPersonalData.facebook,
      linkedIn: localPersonalData.linkedIn,
      twitter: localPersonalData.twitter,
      stackOverflow: localPersonalData.stackOverflow,
      leetcode: localPersonalData.leetcode,
      devUsername: localPersonalData.devUsername,
      resume: localPersonalData.resume,
    });
  }

  // Convert to plain object
  const doc = personalData.toObject ? personalData.toObject() : personalData;
  const displayData = { ...doc, _id: doc._id.toString() };

  return <PersonalDataClient initialData={displayData} />;
}
