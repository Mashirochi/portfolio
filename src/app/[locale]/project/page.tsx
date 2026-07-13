import dbConnect from "@/utils/db";
import { Project } from "@/utils/models/project";
import BlogCard from "@/components/homepage/blog/blog-card";
import { Link } from "@/i18n/routing";
import { FaArrowLeft } from "react-icons/fa";

export default async function AllProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  await dbConnect();
  const projectsDocs = await Project.find().sort({ order: 1 }).lean();
  const projects = JSON.parse(JSON.stringify(projectsDocs));

  return (
    <div className="py-8">
      {/* Back */}
      <Link href="/#blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>{locale === 'vi' ? 'Quay lại' : 'Back'}</span>
      </Link>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            {locale === 'vi' ? 'Tất cả dự án' : 'All Projects'}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          {locale === 'vi' ? 'Chưa có dự án nào.' : 'No projects found.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {projects.map((project: any, i: number) =>
            project?.cover_image ? (
              <BlogCard blog={project} key={i} locale={locale} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}