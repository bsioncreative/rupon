import { useState, useEffect } from "react";
import { MapPin, Sparkles, Ticket, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { useLanguage } from "../context/LanguageContext";

const IMG_LOCATE =
  "https://images.unsplash.com/photo-1722082839841-45473f5a15cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFwJTIwcGluJTIwbG9jYXRpb24lMjBtYXJrZXIlMjBhZXJpYWwlMjBjaXR5fGVufDF8fHx8MTc3MzU5MzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_ROUTE =
  "https://images.unsplash.com/photo-1759299983355-6ddc9a9d8ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwd2Fsa2luZyUyMGphcGFuJTIwYWxsZXklMjBleHBsb3JhdGlvbiUyMHJvdXRlfGVufDF8fHx8MTc3MzU5Mjk0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_COUPON =
  "https://images.unsplash.com/photo-1767519818605-b9f0c9e3d16a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHN0b3JlJTIwc2hvcHBpbmclMjBzdHJlZXQlMjBkaXNjb3VudCUyMHNhbGV8ZW58MXx8fHwxNzczNTkyOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_LANG =
  "https://images.unsplash.com/photo-1764267408655-a563cee336f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwZnJpZW5kcyUyMGV4cGxvcmluZyUyMGt5b3RvJTIwc2hyaW5lfGVufDF8fHx8MTc3MzU5MzA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const IMAGES = [IMG_LOCATE, IMG_ROUTE, IMG_COUPON, IMG_LANG];
const ICONS = [MapPin, Sparkles, Ticket, Globe];
const NUMS = ["01", "02", "03", "04"];
const IDS = ["locate", "ai", "coupon", "language"];

export function WhyTouristsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useLanguage();

  const steps = t.tourists.steps.map((s, i) => ({
    id: IDS[i],
    icon: ICONS[i],
    num: NUMS[i],
    title: s.title,
    desc: s.desc,
    image: IMAGES[i],
  }));

  const active = steps[activeIdx];

  const goTo = (idx: number) => {
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx, steps.length]);

  return (
    <section id="tourists" className="bg-[#f6f6f6] px-[20px] pt-[80px] pb-[32px]">
      {/* Section Container — flex vertical, gap:56, center */}
      <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
        {/* Section Header — flex vertical, gap:12, center */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {t.tourists.tag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {t.tourists.title}
            </h2>
            <p className="text-[#888] max-w-[360px]" style={{ fontSize: 15, lineHeight: 1.7 }}>{t.tourists.desc}</p>
          </div>
        </AnimateOnScroll>

        {/* Content Row — flex horizontal, gap:24, stretch */}
        <AnimateOnScroll preset="fadeUp" delay={0.15} className="w-full">
          <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
            {/* Left: Steps List — flex vertical, gap:8 */}
            <div className="flex flex-col gap-2 lg:w-[320px] shrink-0">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeIdx;
                return (
                  <button
                    key={step.id}
                    onClick={() => goTo(i)}
                    className={`flex flex-col gap-0 rounded-xl text-left cursor-pointer transition-all duration-200 border overflow-hidden ${
                      isActive
                        ? "bg-white border-[#EAEAEA] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                        : "bg-transparent border-transparent hover:bg-white/60"
                    }`}
                  >
                    {/* Mobile Image — only visible on mobile when active */}
                    {isActive && (
                      <div className="lg:hidden w-full h-[180px] relative overflow-hidden">
                        <ImageWithFallback
                          src={step.image}
                          alt={step.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ animation: "fadeIn 0.35s ease-out" }}
                        />
                      </div>
                    )}
                    <div className={`flex items-start gap-4 px-5 py-5 ${
                      !isActive ? "lg:bg-transparent bg-white/60 rounded-xl" : ""
                    }`}>
                      {/* Icon Box — w:40, h:40, rounded-lg, center */}
                      <div
                        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isActive ? "bg-primary text-white" : "bg-[#EAEAEA] text-[#BBB]"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      {/* Text — flex vertical, gap:4 */}
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span
                          className={`transition-colors ${isActive ? "text-primary" : "text-[#CCC]"}`}
                          style={{ fontSize: 11, fontWeight: 700 }}
                        >
                          STEP {step.num}
                        </span>
                        <span
                          className={`transition-colors ${isActive ? "text-[#111]" : "text-[#999]"}`}
                          style={{ fontSize: 15, fontWeight: 600 }}
                        >
                          {step.title}
                        </span>
                        {isActive && (
                          <span className="text-[#888]" style={{ fontSize: 13, lineHeight: 1.6 }}>
                            {step.desc}
                          </span>
                        )}
                        {isActive && (
                          <div className="h-[2px] bg-[#EAEAEA] rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ animation: "progressFill 5s linear forwards" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Image + Label — flex vertical, gap:0 */}
            <div
              key={activeIdx}
              className="hidden lg:flex flex-1 flex-col rounded-2xl overflow-hidden min-h-[400px]"
              style={{ animation: "fadeIn 0.35s ease-out" }}
            >
              {/* Image — fill remaining space */}
              <div className="relative flex-1 min-h-[300px]">
                <ImageWithFallback
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              {/* Label Bar — flex horizontal, gap:8, p:16, bg-white */}
              <div className="flex items-center gap-2 bg-white px-5 py-4">
                <span className="text-primary" style={{ fontSize: 11, fontWeight: 700 }}>
                  STEP {active.num}
                </span>
                <span className="text-[#111]" style={{ fontSize: 15, fontWeight: 600 }}>
                  {active.title}
                </span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progressFill {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}