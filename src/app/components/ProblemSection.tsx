import problemImg from "figma:asset/8fc2abcdbc2da83bc6d409fadb38409d246b6a64.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const IMG_CROWDED = problemImg;

const gemImages = [
  "https://images.unsplash.com/photo-1772487489049-42159a5cdcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFydGlzYW4lMjBjcmFmdHNtYW4lMjBwb3R0ZXJ5JTIwd29ya3Nob3B8ZW58MXx8fHwxNzczNTEyNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1772975293771-85b79d91ef4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjByYW1lbiUyMHJlc3RhdXJhbnQlMjBqYXBhbiUyMGNvenklMjBjb3VudGVyfGVufDF8fHx8MTc3MzUxMjY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1742968922797-f2fb3dd285e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwY2hlZiUyMHByZXBhcmluZyUyMGZvb2QlMjBjbG9zZXVwfGVufDF8fHx8MTc3MzUxMjY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1613011392704-f8da2f20794a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGphcGFuZXNlJTIwc3dlZXRzJTIwd2FnYXNoaSUyMGhhbmRtYWRlfGVufDF8fHx8MTc3MzUxMjY2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763475648219-346b2ed074d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNha2UlMjBicmV3ZXJ5JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzczNTgyMjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1682868067843-11fbc221174a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGluZGlnbyUyMGR5ZWluZyUyMGNyYWZ0JTIwd29ya3Nob3B8ZW58MXx8fHwxNzczNTgyMjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1762991890975-26ab9644319f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGl6YWtheWElMjBoaWRkZW4lMjBhbGxleSUyMGNvenl8ZW58MXx8fHwxNzczNTgyMjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1649749078660-52ffbf617f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNvYmElMjBub29kbGUlMjBoYW5kbWFkZSUyMGNoZWZ8ZW58MXx8fHwxNzczNTgyMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const ratings = ["4.9", "4.8", "4.9", "4.7", "4.9", "4.8", "4.7", "4.9"];

export function ProblemSection() {
  const [page, setPage] = useState(0);
  const { t } = useLanguage();
  const ITEMS_PER_PAGE = 4;

  const hiddenGems = t.problem.gems.map((g, i) => ({
    ...g,
    img: gemImages[i],
    rating: ratings[i],
  }));

  const totalPages = Math.ceil(hiddenGems.length / ITEMS_PER_PAGE);
  const currentGems = hiddenGems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <section id="problem" className="bg-white px-[20px] pt-[96px] pb-[10px]">
      <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
        {/* Section Header */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {t.problem.tag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {t.problem.title.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && t.problem.title.includes("\n") && <br />}</span>
              ))}
            </h2>
            <p className="text-[#888] max-w-[480px]" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {t.problem.desc.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Before — Problem Strip */}
        <AnimateOnScroll preset="scaleUp" className="w-full">
          <div className="w-full flex flex-col sm:flex-row items-stretch gap-5">
            <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ minHeight: 180 }}>
              <ImageWithFallback
                src={IMG_CROWDED}
                alt={t.problem.withoutTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              <div className="relative flex flex-col justify-end h-full gap-3 px-[31px] py-[47px]">
                <span
                  className="bg-white/15 backdrop-blur-sm text-white/90 rounded-lg px-3 py-1 self-start border border-white/20"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {t.problem.withoutBadge}
                </span>
                <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                  {t.problem.withoutTitle}
                </h3>
                <p className="text-white/70 max-w-[360px]" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  {t.problem.withoutDesc.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <span className="text-white/60 text-[#ffffff]" style={{ fontSize: 11 }}>{t.problem.famousDensity}</span>
                    <span className="text-[#FF6B6B]" style={{ fontSize: 15, fontWeight: 800 }}>80%</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <span className="text-white/60 text-[#ffffff]" style={{ fontSize: 11 }}>{t.problem.missedLocal}</span>
                    <span className="text-[#FF6B6B]" style={{ fontSize: 15, fontWeight: 800 }}>90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* After — Discovery Cards */}
        <div className="flex flex-col gap-5 w-full">
          <div className="relative w-full">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span
                  className="bg-primary text-white rounded-lg px-2 py-1 md:px-3 md:py-1.5"
                  style={{ fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: 700 }}
                >
                  {t.problem.withBadge}
                </span>
                <span className="text-[#888] pl-[0px] pr-[4px] py-[0px]" style={{ fontSize: 14 }}>
                  {t.problem.withDesc}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-[#AAA] pl-[0px] pr-[17px] py-[0px]" style={{ fontSize: 12 }}>
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E0E0E0] bg-white hover:border-[#E23111] hover:text-[#E23111] transition-colors disabled:opacity-30 disabled:hover:border-[#E0E0E0] disabled:hover:text-[#111] disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E0E0E0] bg-white hover:border-[#E23111] hover:text-[#E23111] transition-colors disabled:opacity-30 disabled:hover:border-[#E0E0E0] disabled:hover:text-[#111] disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <StaggerContainer key={page} className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.12}>
              {currentGems.map((gem) => (
                <StaggerItem key={gem.title}>
                  <div
                    className="flex gap-4 rounded-2xl border border-[#EAEAEA] p-4 hover:border-[#E23111]/30 hover:shadow-[0_4px_20px_rgba(226,49,17,0.06)] transition-all cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="w-[100px] h-[100px] rounded-xl overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={gem.img}
                        alt={gem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0 justify-center">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-md ${gem.tag === "장인" || gem.tag === "職人" || gem.tag === "Artisan" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-[#E23111]"}`}
                          style={{ fontSize: 10, fontWeight: 700 }}
                        >
                          {gem.tag}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <Star size={11} fill="#FBBF24" strokeWidth={0} className="text-amber-400" />
                          <span className="text-[#888]" style={{ fontSize: 11, fontWeight: 600 }}>{gem.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-[#111] truncate" style={{ fontSize: 15, fontWeight: 700 }}>
                        {gem.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#BBB] shrink-0" />
                        <span className="text-[#AAA] truncate" style={{ fontSize: 11 }}>{gem.location}</span>
                      </div>
                      <p className="text-[#888] line-clamp-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                        {gem.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Bottom Stat */}
          <AnimateOnScroll delay={0.2}>
            <div className="flex flex-row flex-wrap items-center justify-evenly gap-4 sm:gap-8 bg-[#F6F6F6] rounded-2xl mx-[0px] my-[27px] px-[16px] py-[24px] sm:px-[40px] sm:py-[56px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-emerald-600" style={{ fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 800 }}>+340%</span>
                <span className="text-[#000000]" style={{ fontSize: "clamp(9px, 2.5vw, 12px)" }}>{t.problem.statLocal}</span>
              </div>
              <div className="w-px h-6 sm:h-8 bg-[#E0E0E0]" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-primary" style={{ fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 800 }}>2,400+</span>
                <span className="text-[#000000]" style={{ fontSize: "clamp(9px, 2.5vw, 12px)" }}>{t.problem.statRegistered}</span>
              </div>
              <div className="w-px h-6 sm:h-8 bg-[#E0E0E0]" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#111]" style={{ fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 800 }}>98%</span>
                <span className="text-[#000000]" style={{ fontSize: "clamp(9px, 2.5vw, 12px)" }}>{t.problem.statSatisfaction}</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}