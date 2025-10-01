"use client";
import React, { createContext, useContext, useState } from "react";
import en from "../translations/en.json";
import hi from "../translations/hi.json";
import mr from "../translations/mr.json";

type Lang = "en" | "hi" | "mr";

const translations: Record<Lang, any> = { en, hi, mr };

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
