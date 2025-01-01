"use client"
import Link from "next/link";
import { useParams } from "next/navigation";

const ClientNavbar = () => {
    const params = useParams<{ locale: string; }>()
    const locale = params.locale
    return (

        <li>
            <Link
                href={locale === "en" ? "http://localhost:3000/vi" : "http://localhost:3000/en"}
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                prefetch={true} >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                    {locale === "en" ? "Tiếng Việt" : "English"}
                </div></Link>
        </li>

    )
}

export default ClientNavbar;