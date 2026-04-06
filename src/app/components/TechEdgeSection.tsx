import { Sparkles, Route, Navigation, Clock, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { useLanguage } from "../context/LanguageContext";

const IMG_MAP =
  "https://images.unsplash.com/photo-1700323315212-3fc41e23b77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMHN0cmVldCUyMG1hcCUyMGFlcmlhbCUyMHZpZXclMjBjaXR5fGVufDF8fHx8MTc3MzUwODcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const SPEC_ICONS = [Zap, Route, Navigation, Clock];
const SPEC_COLORS = [
  { color: "text-primary", bg: "bg-primary/10" },
  { color: "text-emerald-600", bg: "bg-emerald-50" },
  { color: "text-blue-600", bg: "bg-blue-50" },
  { color: "text-violet-600", bg: "bg-violet-50" },
];

const STOP_POSITIONS = [
  { step: 1, top: "16%", left: "30%" },
  { step: 2, top: "26%", left: "58%" },
  { step: 3, top: "49%", left: "72%" },
  { step: 4, top: "67%", left: "19%" },
];

export function TechEdgeSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="tech" className="bg-[#F6F6F6] px-[20px] pt-[50px] pb-[56px]">
      {/* Section Container — flex vertical, gap:56, center */}
      <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
        {/* Section Header — flex vertical, gap:12, center */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {t.tech.tag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {t.tech.title}
            </h2>
            <p className="text-[#888] max-w-[420px]" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {t.tech.desc.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Tech Specs — key differentiators */}
        <StaggerContainer key={`specs-${lang}`} className="flex flex-wrap gap-3 w-full" stagger={0.1} once={false}>
          {t.tech.specs.map((s, i) => {
            const Icon = SPEC_ICONS[i];
            const c = SPEC_COLORS[i];
            return (
              <StaggerItem key={`${lang}-${i}`} className="flex-1 min-w-[140px]">
                <div className="flex flex-col items-center gap-2 bg-white rounded-xl border border-[#EAEAEA] p-6 text-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg}`}>
                    <Icon size={18} className={c.color} />
                  </div>
                  <span className="text-[#111]" style={{ fontSize: 24, fontWeight: 800 }}>{s.value}</span>
                  <span className="text-[#888]" style={{ fontSize: 12, fontWeight: 500 }}>{s.label}</span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Map + Merchant — flex horizontal, gap:20 */}
        <AnimateOnScroll preset="scaleUp" className="w-full">
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            {/* Map Visualization — relative, image bg with overlay UI */}
            <div className="flex-[3] flex flex-col rounded-2xl overflow-hidden min-h-[400px]">
              {/* Image + Overlay */}
              <div className="relative flex-1">
                <ImageWithFallback
                  src={IMG_MAP}
                  alt="city aerial view"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1A1C2E]/75" />

                {/* Overlay UI — Route Visualization */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 p-6">
                  {/* Route Map — relative container */}
                  <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
                    {/* AI Scan radius rings */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
                    <div className="absolute inset-[18%] rounded-full border border-dashed border-white/20" />
                    <div className="absolute inset-[38%] rounded-full border border-dashed border-white/30" />

                    {/* Route path SVG — connects stops in order */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" fill="none">
                      <path
                        d="M170 170 L120 75 L218 109 L265 187 L85 245"
                        stroke="rgba(226,49,17,0.5)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        strokeLinecap="round"
                      />
                      {/* Direction dots along path */}
                      <circle cx="145" cy="122" r="2.5" fill="rgba(226,49,17,0.6)" />
                      <circle cx="192" cy="100" r="2.5" fill="rgba(226,49,17,0.6)" />
                      <circle cx="248" cy="165" r="2.5" fill="rgba(226,49,17,0.6)" />
                      <circle cx="150" cy="230" r="2.5" fill="rgba(226,49,17,0.6)" />
                    </svg>

                    {/* Numbered Route Stops — positioned to match route path */}
                    {STOP_POSITIONS.map((pos, i) => {
                      const stop = t.tech.stops[i];
                      return (
                        <div
                          key={pos.step}
                          className="absolute flex flex-col items-center gap-0.5 z-[2]"
                          style={{ top: pos.top, left: pos.left }}
                        >
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-primary" style={{ fontSize: 11, fontWeight: 800 }}>{pos.step}</span>
                          </div>
                          <div className="bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex flex-col items-center shadow-sm">
                            <span className="text-[#333] whitespace-nowrap" style={{ fontSize: 8, fontWeight: 600 }}>{stop.name}</span>
                            <span className="text-[#999] whitespace-nowrap" style={{ fontSize: 7 }}>{stop.time}</span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Center Pin — origin */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 translate-y-4">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping aspect-square" style={{ animationDuration: "2s" }} />
                        <div className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(226,49,17,0.5)] animate-[pulse-scale_2s_ease-in-out_infinite]">
                          <Navigation className="text-white" size={20} />
                          <style>{`
                            @keyframes pulse-scale {
                              0%, 100% { transform: scale(1); }
                              50% { transform: scale(1.15); }
                            }
                          `}</style>
                        </div>
                      </div>
                      <span className="bg-white rounded-md px-2.5 py-1 text-[#111] shadow-sm" style={{ fontSize: 10, fontWeight: 700 }}>
                        {t.tech.origin}
                      </span>
                    </div>
                  </div>

                  {/* Route Summary — below the map */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                      <Route size={12} className="text-white/50" />
                      <div className="flex flex-col">
                        <span className="text-white/40" style={{ fontSize: 9, fontWeight: 600 }}>{t.tech.totalRoute}</span>
                        <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>{t.tech.totalPlaces}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                      <Clock size={12} className="text-white/50" />
                      <div className="flex flex-col">
                        <span className="text-white/40" style={{ fontSize: 9, fontWeight: 600 }}>{t.tech.totalTime}</span>
                        <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>{t.tech.totalDuration}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <Zap size={12} className="text-emerald-400" />
                      <span className="text-emerald-400" style={{ fontSize: 10, fontWeight: 600 }}>{t.tech.genSpeed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Merchant List — flex vertical, gap:20, bg-white, p:20, rounded */}
            <div className="flex-[2] flex flex-col gap-5 bg-white rounded-2xl border border-[#EAEAEA] p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary shrink-0" size={15} />
                <span className="text-[#111]" style={{ fontSize: 14, fontWeight: 600 }}>{t.tech.aiRecommend}</span>
                <span className="text-[#AAA] ml-auto text-[#676767]" style={{ fontSize: 11 }}>{t.tech.course}</span>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {t.tech.merchants.map((m, i) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 rounded-xl bg-[#F6F6F6] px-4 py-3.5"
                  >
                    <span
                      className="shrink-0 w-6 h-6 rounded bg-primary/8 text-primary flex items-center justify-center"
                      style={{ fontSize: 11, fontWeight: 800 }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[#111] truncate" style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</span>
                      <span className="text-[#AAA]" style={{ fontSize: 11 }}>{m.dist}</span>
                    </div>
                    <span
                      className="text-emerald-600 bg-emerald-50 rounded-md px-2 py-1 shrink-0"
                      style={{ fontSize: 11, fontWeight: 700 }}
                    >
                      {[95, 88, 82, 78][i]}%
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-primary text-white py-3 rounded-xl cursor-pointer hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                <Sparkles size={14} />
                {t.tech.startRoute}
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}