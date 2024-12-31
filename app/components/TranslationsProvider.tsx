"use client";
import { I18nextProvider } from "react-i18next";
import { ReactNode } from "react";
import { Resource, createInstance } from "i18next";
import initializeTranslations from "app/i18n";

export default function TranslationsProvider({
    children,
    locale,
    namespaces,
    resources,
}: {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources: Resource;
}) {
    const i18n = createInstance();

    initializeTranslations(locale, namespaces, i18n, resources);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}