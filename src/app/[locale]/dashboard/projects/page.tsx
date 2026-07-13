import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/db";
import { Project } from "@/utils/models/project";
import { redirect } from "@/i18n/routing";
import ProjectsClient from "@/components/dashboard/projects/ProjectsClient";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions);
  const locale = (await params).locale;

  if (!session) {
    redirect({ href: "/login", locale });
  }

  await dbConnect();
  
  // Fetch existing data
  let projects = await Project.find().sort({ order: 1 });

  // Auto-seed data if database is empty
  if (projects.length === 0) {
    const { project_data } = await import("@/utils/data/projects");
    const seedData = project_data.map((proj: any, idx: number) => ({
      vi_title: proj.title || "",
      en_title: proj.title || "",
      vi_role: "",
      en_role: "",
      vi_short_description: proj.description || "",
      en_short_description: proj.description || "",
      vi_description: proj.description || "",
      en_description: proj.description || "",
      vi_problem: "",
      en_problem: "",
      vi_solution: "",
      en_solution: "",
      vi_features: "",
      en_features: "",
      vi_challenges: "",
      en_challenges: "",
      cover_image: proj.cover_image || "",
      youtube_url: "",
      github_url: "",
      url: proj.url || "",
      published_at: proj.published_at || "",
      tags: proj.tag_list || [],
      order: idx + 1,
    }));
    await Project.insertMany(seedData as any[]);
    projects = await Project.find().sort({ order: 1 });
  }

  const displayData = projects.map((proj) => {
    const doc = proj.toObject ? proj.toObject() : proj;
    return { ...doc, _id: doc._id.toString() };
  });

  return <ProjectsClient initialData={displayData} />;
}
