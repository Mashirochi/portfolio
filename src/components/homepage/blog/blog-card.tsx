import { timeConverter } from '@/utils/time-converter';
import { Link } from "@/i18n/routing";
import Image from 'next/image';
import { FaGithub, FaYoutube } from 'react-icons/fa';

function BlogCard({ blog, locale }: { blog: any, locale: string }) {
  const title = locale === 'vi' ? blog.vi_title : blog.en_title;
  const shortDesc = locale === 'vi'
    ? (blog.vi_short_description || blog.vi_description)
    : (blog.en_short_description || blog.en_description);
  const role = locale === 'vi' ? blog.vi_role : blog.en_role;

  // Date comes in ISO format from MongoDB
  const publishedAt = new Date(blog.published_at).toString() !== "Invalid Date"
    ? timeConverter(new Date(blog.published_at).toISOString())
    : "";

  const detailHref = `/project/${blog._id}`;

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group flex flex-col h-full">
      <Link href={detailHref} className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg block">
        {blog?.cover_image && (
          <Image
            src={blog.cover_image}
            height={1080}
            width={1920}
            alt="cover image"
            className='h-full w-full group-hover:scale-110 transition-all duration-300 object-cover'
          />
        )}
      </Link>
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{publishedAt}</p>
        </div>
        <Link href={detailHref}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500 line-clamp-2'>
            {title}
          </p>
        </Link>
        {role && (
          <p className='mb-2 text-sm text-[#16f2b3]'>
            {locale === 'vi' ? 'Vai trò' : 'Role'}: {role}
          </p>
        )}
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {shortDesc}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-[#1a1443] px-2 py-1 rounded text-xs text-[#16f2b3]">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2">
          <Link href={detailHref}>
            <button className='bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-all'>
              {locale === 'vi' ? 'Chi tiết' : 'Details'}
            </button>
          </Link>
          {blog.youtube_url && (
            <a href={blog.youtube_url} target='_blank' rel='noreferrer'>
              <button className='flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all'>
                <FaYoutube size={12} />
                Demo
              </button>
            </a>
          )}
          {blog.github_url && (
            <a href={blog.github_url} target='_blank' rel='noreferrer'>
              <button className='flex items-center gap-1.5 bg-[#1a1f3c] border border-[#2a2a5a] hover:bg-[#2a2a5a] text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all'>
                <FaGithub size={12} />
                GitHub
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;