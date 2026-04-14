"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, type Dict, type Locale } from "./translations";

type LocaleContextValue = {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readInitialLocale(defaultLocale: Locale): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  if (fromUrl === "ar" || fromUrl === "en") return fromUrl;
  try {
    const stored = window.localStorage.getItem("intake.locale");
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("ar")) return "ar";
  return defaultLocale;
}

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Read persisted/URL/nav locale on mount
  useEffect(() => {
    setLocale(readInitialLocale(defaultLocale));
  }, [defaultLocale]);

  // Reflect locale on <html>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = translations[locale].dir;
    try {
      window.localStorage.setItem("intake.locale", locale);
    } catch {
      /* ignore */
    }
    // Also update URL query without reload
    const url = new URL(window.location.href);
    if (url.searchParams.get("lang") !== locale) {
      url.searchParams.set("lang", locale);
      window.history.replaceState({}, "", url.toString());
    }
    return () => {
      // On unmount (leaving intake area), restore LTR English for the rest of the site
      html.lang = "en";
      html.dir = "ltr";
    };
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: translations[locale],
      setLocale,
      toggleLocale: () => setLocale((l) => (l === "en" ? "ar" : "en")),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
