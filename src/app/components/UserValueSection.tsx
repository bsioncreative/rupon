import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import appStoreBadge from "../../assets/b0b18c1e603a73879ce19dd04067fadfcfa3ccfc.png";
import googlePlayBadge from "../../assets/af49cd5d1ffa6da8aa01dd742b92934b5b4fc1c5.png";
import { useLanguage } from "../context/LanguageContext";

const valueImages = [
  "https://images.unsplash.com/photo-1758613171548-b26cb5d2abf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwdHJhdmVsJTIwYXBwJTIwc21hcnRwaG9uZSUyMGhhcHB5JTIwdG91cmlzdHxlbnwxfHx8fDE3NzM1ODg5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1772284650961-6f88e23f98c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBsb2NhbCUyMGFsbGV5JTIwamFwYW4lMjBzdHJlZXQlMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3NzM1ODg5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1696013910376-c56f76dd8178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJpdmFjeSUyMHNlY3VyaXR5JTIwc2hpZWxkJTIwbG9ja3xlbnwxfHx8fDE3NzM1ODg5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function UserValueSection() {
  const { lang, t } = useLanguage();

  const values = t.value.values.map((v, i) => ({
    ...v,
    image: valueImages[i],
  }));

  return (
    <section id="download" className="bg-white px-[20px] py-[47px]">
      {/* Section Container — flex vertical, gap:56, center */}
      <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
        {/* Section Header — flex vertical, gap:12, center */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {t.value.tag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >{t.value.title}<br /></h2>
            
          </div>
        </AnimateOnScroll>

        {/* Value Grid — 2×3, icon cards */}
        <StaggerContainer key={`values-${lang}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full" stagger={0.08} once={false}>
          {values.map((v, i) => {
            return (
              <StaggerItem key={`${lang}-${i}`}>
                <div className="flex flex-col gap-0 rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <div className="w-full h-[160px] overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <h3 className="text-[#111]" style={{ fontSize: 15, fontWeight: 600 }}>
                      {v.title}
                    </h3>
                    <p className="text-[#777]" style={{ fontSize: 13, lineHeight: 1.6 }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Final CTA — flex vertical, gap:24, center, bg-primary/5, rounded */}
        <AnimateOnScroll preset="scaleUp" className="w-full">
          <div className="relative flex flex-col items-center gap-4 lg:gap-6 rounded-2xl px-6 lg:px-10 py-8 lg:py-14 w-full text-center border border-primary/10 overflow-hidden">
            {/* Background image overlay */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1711869090437-e6dfa2c34a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb20lMjBhYnN0cmFjdCUyMHNvZnQlMjBwYXR0ZXJufGVufDF8fHx8MTc3MzU5MTM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.08,
              }}
            />
            <div className="absolute inset-0 z-0 bg-primary/5" />
            {/* CTA Text — flex vertical, gap:12, center */}
            <div className="flex flex-col items-center gap-3 relative z-10">
              <h2 className="text-[#111] p-[0px]" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.3px" }}>
                {t.value.ctaTitle.split("\n").map((line, i) => (
                  <span key={i} className="block leading-[1.15] lg:leading-[1.4] text-[20px]">{line}</span>
                ))}
              </h2>
              <p className="text-[#888] max-w-[360px]" style={{ fontSize: 15, lineHeight: 1.7 }}>{t.value.ctaDesc}</p>
            </div>

            {/* Store Buttons — flex horizontal, gap:12 */}
            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img src={appStoreBadge} alt="Download on the App Store" className="h-[40px] w-auto rounded-lg" />
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-[40px] w-auto rounded-lg" />
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
