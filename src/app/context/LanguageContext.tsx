import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "../i18n/translations";

/* ── URL query param ↔ Lang 매핑 ── */
const paramToLang: Record<string, Lang> = { ko: "KR", ja: "JP", en: "EN" };
const langToParam: Record<Lang, string> = { KR: "ko", JP: "ja", EN: "en" };

function getLangFromURL(): Lang {
  // 1) ?lang=ja 쿼리 파라미터
  const params = new URLSearchParams(window.location.search);
  const qVal = params.get("lang")?.toLowerCase();
  if (qVal && paramToLang[qVal]) return paramToLang[qVal];

  // 2) #lang=ja 해시 파라미터 (Figma Sites 등 쿼리 파라미터 제거 환경 대응)
  const hash = window.location.hash; // e.g. "#lang=ja"
  const hashMatch = hash.match(/lang=(\w+)/);
  if (hashMatch) {
    const hVal = hashMatch[1].toLowerCase();
    if (paramToLang[hVal]) return paramToLang[hVal];
  }

  return "KR";
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "KR",
  setLang: () => {},
  t: translations.KR,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getLangFromURL);

  /* lang 변경 시 URL 쿼리 파라미터도 동기화 */
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", langToParam[newLang]);
    window.history.replaceState({}, "", url.toString());
  };

  /* 브라우저 뒤로가기/앞으로가기 대응 */
  useEffect(() => {
    const handlePopState = () => setLangState(getLangFromURL());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}