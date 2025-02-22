// LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Montserrat, Noto_Nastaliq_Urdu } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const nastaliq = Noto_Nastaliq_Urdu({subsets: ["arabic"]})
// Define a type for our language options
export type Language = "EN" | "UR";

// Define the shape of our context value
interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

// Create the context with an explicit type
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // The state is now explicitly typed as Language
  const [currentLanguage, setCurrentLanguage] = useState<Language>("EN");

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      <div className={currentLanguage == "UR" ? "" : montserrat.className} dir={currentLanguage == "UR" ? "rtl" : "ltr"}>
        {children}
      </div>      
    </LanguageContext.Provider>
  );
}

// Custom hook for consuming the language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const translations: Record<Language, Record<string, any>> = {
  EN: {
    Home: "Home",
    About: "About",
    Courses: "Courses",
    Blog: "Blog",
    Contact: "Contact",
    "Terms of Use": "Terms of Use",
    "Privacy Policy": "Privacy Policy"
  },
  UR: {
    Home: "مرکز",
    About: "ہمارے بارے میں",
    Courses: "کورسز",
    Blog: "بلاگ",
    Contact: "ہم سے رابطہ کریں",
    "Terms of Use": "استعمال کی شرائط",
    "Privacy Policy": "رازداری کی پالیسی"
  },
};
