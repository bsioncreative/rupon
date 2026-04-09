import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import logoRed from "../../assets/4942a29f204ffb8e21a996ac5bac4cd126bae468.png";
import logoWhite from "../../assets/d30d50279da8ad4f96a82b5bb26f620b094c7725.png";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n/translations";

const LANGS: Lang[] = ["KR", "JP", "EN"];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = location.pathname === "/";
    const { lang, setLang, t } = useLanguage();
    const NAV = t.nav;

  useEffect(() => {
        const updateScrolled = () => {
                const el = document.getElementById("main-scroll");
                const scrollTop = el && el.scrollHeight > el.clientHeight
                  ? el.scrollTop
                          : window.scrollY;
                setScrolled(scrollTop > 40);
        };

                const el = document.getElementById("main-scroll");
        if (el && el.scrollHeight > el.clientHeight) {
                el.addEventListener("scroll", updateScrolled);
                return () => el.removeEventListener("scroll", updateScrolled);
        } else {
                window.addEventListener("scroll", updateScrolled);
                updateScrolled();
                return () => window.removeEventListener("scroll", updateScrolled);
        }
  }, []);

  useEffect(() => {
        if (!isLanding) return;
        const sectionIds = NAV.map((n) => n.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];

                const handleIntersect = (entries: IntersectionObserverEntry[]) => {
                        entries.forEach((entry) => {
                                  if (entry.isIntersecting) {
                                              setActiveSection("#" + entry.target.id);
                                  }
                        });
                };

                const scrollRoot = document.getElementById("main-scroll");
        const useWindowScroll = !scrollRoot || scrollRoot.scrollHeight <= scrollRoot.clientHeight;
        const lastSectionId = sectionIds[sectionIds.length - 1];

                const handleScroll = () => {
                        const root = useWindowScroll ? null : scrollRoot;
                        const scrollTop = useWindowScroll ? window.scrollY : (scrollRoot?.scrollTop ?? 0);
                        const scrollHeight = useWindowScroll ? document.documentElement.scrollHeight : (scrollRoot?.scrollHeight ?? 0);
                        const clientHeight = useWindowScroll ? window.innerHeight : (scrollRoot?.clientHeight ?? 0);
                        if (scrollHeight - scrollTop - clientHeight < 100) {
                                  setActiveSection("#" + lastSectionId);
                        }
                };

                if (useWindowScroll) {
                        window.addEventListener("scroll", handleScroll);
                } else {
                        scrollRoot?.addEventListener("scroll", handleScroll);
                }

                const timer = setTimeout(() => {
                        sectionIds.forEach((id) => {
                                  const el = document.getElementById(id);
                                  if (!el) return;
                                  const observer = new IntersectionObserver(handleIntersect, {
                                              root: useWindowScroll ? null : scrollRoot,
                                              rootMargin: "-30% 0px -45% 0px",
                                              threshold: 0,
                                  });
                                  observer.observe(el);
                                  observers.push(observer);
                        });
                }, 200);

                return () => {
                        clearTimeout(timer);
                        observers.forEach((o) => o.disconnect());
                        if (useWindowScroll) {
                                  window.removeEventListener("scroll", handleScroll);
                        } else {
                                  scrollRoot?.removeEventListener("scroll", handleScroll);
                        }
                };
  }, [isLanding, lang]);

  useEffect(() => {
        if (isLanding && location.hash) {
                const tryScroll = () => {
                          const target = document.querySelector(location.hash);
                          if (target) {
                                      target.scrollIntoView({ behavior: "smooth" });
                          }
                };
                const timer = setTimeout(tryScroll, 100);
                return () => clearTimeout(timer);
        }
  }, [isLanding, location.hash]);

  const go = (href: string) => {
        if (isLanding) {
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else {
                navigate("/" + href);
        }
        setOpen(false);
  };

  return (
        <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                          scrolled || !isLanding
                            ? "bg-white/95 backdrop-blur-lg border-b border-[#F0F0F0] shadow-sm"
                            : "bg-transparent"
                }`}
              >
              <div className="flex items-center justify-between h-[64px] max-w-[1080px] w-full mx-auto px-5">
                      <Link
                                  to="/"
                                  className="flex items-center"
                                  onClick={(e) => {
                                                if (isLanding) {
                                                                e.preventDefault();
                                                                const scrollRoot = document.getElementById("main-scroll");
                                                                if (scrollRoot && scrollRoot.scrollHeight > scrollRoot.clientHeight) {
                                                                                  scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
                                                                } else {
                                                                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                                                }
                                                }
                                  }}
                                >
                                <img
                                              src={scrolled || !isLanding ? logoRed : logoWhite}
                                              alt="RUPON"
                                              className="h-[20px] w-auto transition-opacity duration-300"
                                            />
                      </Link>Link>
                      <nav className="hidden md:flex items-center gap-1">
                        {NAV.map((n) => {
                            const isActive = isLanding && scrolled && activeSection === n.href;
                            return (
                                            <button
                                                              key={n.label}
                                                              onClick={() => go(n.href)}
                                                              className={`relative px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                                                                                  isActive
                                                                                    ? "text-primary"
                                                                                    : scrolled || !isLanding
                                                                                    ? "text-[#666] hover:text-[#111] hover:bg-[#F5F5F5]"
                                                                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                                              }`}
                                                              style={{ fontSize: 14, fontWeight: isActive ? 700 : 500 }}
                                                            >
                                              {n.label}
                                              {isActive && (
                                                                                <span
                                                                                                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full"
                                                                                                      style={{ width: `${n.label.length * 8}px`, maxWidth: '60%' }}
                                                                                                    />
                                                                              )}
                                            </button>button>
                                          );
              })}
                      </nav>nav>
                      <div className="hidden md:flex items-center gap-3">
                                <div className="flex items-center gap-0.5">
                                  {LANGS.map((l) => (
                              <button
                                                key={l}
                                                onClick={() => setLang(l)}
                                                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                                                                    l === lang
                                                                      ? "text-primary"
                                                                      : scrolled || !isLanding
                                                                      ? "text-[#BBB] hover:text-[#666]"
                                                                      : "text-white/40 hover:text-white/70"
                                                }`}
                                                style={{ fontSize: 11, fontWeight: 600 }}
                                              >
                                {l}
                              </button>button>
                            ))}
                                </div>div>
                                <Link
                                              to="/partners"
                                              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-[#C92A0E] transition-colors cursor-pointer"
                                              style={{ fontSize: 13, fontWeight: 600 }}
                                            >
                                  {t.header.partner}
                                </Link>Link>
                      </div>div>
                      <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? (
                            <X className={scrolled || !isLanding ? "text-[#111]" : "text-white"} size={22} />
                          ) : (
                            <Menu className={scrolled || !isLanding ? "text-[#111]" : "text-white"} size={22} />
                          )}
                      </button>button>
              </div>div>
          {open && (
                        <div className="absolute top-[64px] left-0 right-0 bg-white border-b border-[#F0F0F0] md:hidden">
                                  <div className="flex flex-col gap-1 p-4">
                                    {NAV.map((n) => {
                                        const isActive = isLanding && scrolled && activeSection === n.href;
                                        return (
                                                          <button
                                                                              key={n.label}
                                                                              onClick={() => go(n.href)}
                                                                              className={`w-full text-left py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                                                                                                    isActive
                                                                                                      ? "text-primary border-l-2 border-primary"
                                                                                                      : "text-[#333] hover:bg-[#F5F5F5]"
                                                                              }`}
                                                                              style={{ fontSize: 15, fontWeight: isActive ? 700 : 500 }}
                                                                            >
                                                            {n.label}
                                                          </button>button>
                                                        );
                        })}
                                              <div className="flex items-center gap-1 px-4 py-3">
                                                {LANGS.map((l, i) => (
                                          <div key={l} className="flex items-center gap-1">
                                                            <button
                                                                                  onClick={() => {
                                                                                                          setLang(l);
                                                                                                          setOpen(false);
                                                                                    }}
                                                                                  className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                                                                                                          l === lang ? "text-primary" : "text-[#BBB] hover:text-[#666]"
                                                                                    }`}
                                                                                  style={{ fontSize: 12, fontWeight: 600 }}
                                                                                >
                                                              {l}
                                                            </button>button>
                                            {i < 2 && <span className="text-[#DDD]">·</span>span>}
                                          </div>div>
                                        ))}
                                              </div>div>
                                              <Link
                                                              to="/partners"
                                                              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-[#C92A0E] transition-colors cursor-pointer mt-1 block text-center"
                                                              style={{ fontSize: 14, fontWeight: 600 }}
                                                              onClick={() => setOpen(false)}
                                                            >
                                                {t.header.partner}
                                              </Link>Link>
                                  </div>div>
                        </div>div>
              )}
        </motion.header>motion.header>
      );
}</motion.header>
