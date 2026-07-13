import dbConnect from "@/utils/db";
import { Project } from "@/utils/models/project";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FaGithub, FaYoutube, FaArrowLeft, FaTag } from "react-icons/fa";
import { notFound } from "next/navigation";

// Static site rendering - generate paths at build time
export async function generateStaticParams() {
  try {
    await dbConnect();
    const projects = await Project.find({}, '_id').lean();
    const locales = ['en', 'vi'];
    const params = [];
    for (const locale of locales) {
      for (const project of projects) {
        params.push({ locale, id: project._id.toString() });
      }
    }
    return params;
  } catch {
    return [];
  }
}

// Fetch project server-side
async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch {
    return null;
  }
}

interface SectionProps {
  title: string;
  content: string;
  icon: string;
}

function DetailSection({ title, content, icon }: SectionProps) {
  if (!content) return null;
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      <div className="bg-[#101428]/80 border border-[#2a2a5a] rounded-xl p-5">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  const title = locale === 'vi' ? project.vi_title : project.en_title;
  const role = locale === 'vi' ? project.vi_role : project.en_role;
  const shortDesc = locale === 'vi' ? project.vi_short_description : project.en_short_description;
  const description = locale === 'vi' ? project.vi_description : project.en_description;
  const problem = locale === 'vi' ? project.vi_problem : project.en_problem;
  const solution = locale === 'vi' ? project.vi_solution : project.en_solution;
  const features = locale === 'vi' ? project.vi_features : project.en_features;
  const challenges = locale === 'vi' ? project.vi_challenges : project.en_challenges;

  const sectionLabels =
    locale === 'vi'
      ? {
          role: 'Vai trò của bạn',
          tech: 'Tech Stack',
          problem: 'Vấn đề cần giải quyết',
          solution: 'Giải pháp đã thực hiện',
          features: 'Các tính năng nổi bật',
          challenges: 'Khó khăn và bài học',
          links: 'Live Demo / GitHub',
          back: 'Quay lại',
        }
      : {
          role: 'Your Role',
          tech: 'Tech Stack',
          problem: 'Problem to Solve',
          solution: 'Solution Implemented',
          features: 'Key Features',
          challenges: 'Challenges & Lessons',
          links: 'Live Demo / GitHub',
          back: 'Back',
        };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link href="/project" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>{sectionLabels.back}</span>
      </Link>

      {/* Hero */}
      {project.cover_image && (
        <div className="w-full rounded-2xl overflow-hidden mb-8 border border-[#2a2a5a] shadow-2xl">
          <Image
            src={project.cover_image}
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>

      {/* Short description */}
      {shortDesc && (
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">{shortDesc}</p>
      )}
      {!shortDesc && description && (
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">{description}</p>
      )}

      {/* Role */}
      {role && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">👤</span>
            {sectionLabels.role}
          </h2>
          <div className="bg-[#101428]/80 border border-[#2a2a5a] rounded-xl p-5">
            <p className="text-[#16f2b3] font-medium text-lg">{role}</p>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {project.tags && project.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <FaTag className="text-violet-400" />
            {sectionLabels.tech}
          </h2>
          <div className="bg-[#101428]/80 border border-[#2a2a5a] rounded-xl p-5">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="bg-[#1a1443] border border-violet-500/30 px-3 py-1.5 rounded-full text-sm text-[#16f2b3] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail sections */}
      <DetailSection title={sectionLabels.problem} content={problem} icon="🔍" />
      <DetailSection title={sectionLabels.solution} content={solution} icon="💡" />
      <DetailSection title={sectionLabels.features} content={features} icon="⭐" />
      <DetailSection title={sectionLabels.challenges} content={challenges} icon="🧗" />

      {/* Links */}
      {(project.youtube_url || project.github_url) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            {sectionLabels.links}
          </h2>
          <div className="flex flex-wrap gap-4">
            {project.youtube_url && (
              <a
                href={project.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-red-600/20 hover:scale-105"
              >
                <FaYoutube size={20} />
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[#1a1f3c] border border-[#2a2a5a] hover:bg-[#2a2a5a] text-white rounded-xl font-medium transition-all hover:scale-105"
              >
                <FaGithub size={20} />
                Source Code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
