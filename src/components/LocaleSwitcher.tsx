"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  
  const nextLocaleIndex = (routing.locales.indexOf(locale as any) + 1) % routing.locales.length;
  const nextLocale = routing.locales[nextLocaleIndex];
  
  const localeLabels: Record<string, string> = {
    en: "English",
    vi: "Tiếng Việt"
  };

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="block px-4 py-2 no-underline outline-none hover:no-underline"
    >
      <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
        {localeLabels[nextLocale] || nextLocale.toUpperCase()}
      </div>
    </Link>
  );
}
