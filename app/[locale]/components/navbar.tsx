import { Link } from "i18n/routing";
import { getTranslations } from "next-intl/server";
import { cookies } from 'next/headers'
import LocaleSwitcher from "./LocaleSwitcher";

async function Navbar() {
  const t = await getTranslations('Navbar');
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#16f2b3] text-3xl font-bold">
            MASHIROCHI
          </Link>
        </div>
        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">

          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('about')}
              </div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('experience')}
              </div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('skills')}
              </div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('education')}
              </div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href={"/project"}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('project')}
              </div>
            </Link>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;