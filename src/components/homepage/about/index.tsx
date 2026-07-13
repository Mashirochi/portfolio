
import Image from "next/image";

function AboutSection({ personalData, locale }: { personalData: any, locale: string }) {
  if (!personalData) return null;

  const description = locale === 'vi' ? personalData.vi_description : personalData.en_description;

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            ABOUT ME
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg whitespace-pre-wrap">
            {description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          {personalData.profile && (
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="img"
              className="rounded-lg transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-110 cursor-pointer object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;