import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import appScreen1 from "../../assets/b5f2006a0a7faadb51dff60872d725785a496e7b.png";
import appScreen2 from "../../assets/1a9d8a8f0baf6daee3b36d752fa0186f83ca1240.png";
import appScreen3 from "../../assets/9faa6c741fdbb5dd6674c64ff41373d842c931a2.png";
import appStoreBadge from "../../assets/b0b18c1e603a73879ce19dd04067fadfcfa3ccfc.png";
import googlePlayBadge from "../../assets/af49cd5d1ffa6da8aa01dd742b92934b5b4fc1c5.png";
import { useLanguage } from "../context/LanguageContext";

const HERO_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1559866105-63d346cc87f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMGRvdG9uYm9yaSUyMG5lb24lMjBuaWdodCUyMHN0cmVldHxlbnwxfHx8fDE3NzM1NzQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1684419080285-c9bce3bc022b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGZ1c2hpbWklMjBpbmFyaSUyMHNocmluZSUyMHRvcmlpJTIwZ2F0ZXN8ZW58MXx8fHwxNzczNTc0NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1709754964785-a2493b995da8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNoaWJ1eWElMjBjcm9zc2luZyUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NzM1NzQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1745402440689-df47fe738d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb20lMjB0ZW1wbGUlMjBzcHJpbmd8ZW58MXx8fHwxNzczNTc0NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1761210719326-0c35b610434e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGZ1amklMjBsYWtlJTIwc2NlbmljJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MzU3NDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111]">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.35, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ImageWithFallback
            src={HERO_BACKGROUNDS[bgIndex]}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#111]/30 via-[#111]/40 to-[#111]/70" />

      {/* Content — flex vertical, center, px:20, pt:140, pb:100 */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-5 pt-[140px] pb-[100px]">
        {/* Row — flex horizontal, gap:48, center */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column — flex vertical, gap:0 (children use own gaps) */}
          <motion.div
            className="flex flex-col items-start gap-6 flex-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Badge — flex horizontal, gap:8, px:12, py:6 */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
              <span className="text-white/60" style={{ fontSize: 12, fontWeight: 600 }}>
                {t.hero.badge}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-white"
              style={{
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-1.5px",
              }}
            >
              {t.hero.heading1}
              <span className="text-primary">{t.hero.headingAccent}</span><br />
              {t.hero.heading2}<br />
              {t.hero.heading3}
            </h1>

            {/* Sub text */}
            <p className="text-white/45 max-w-[400px] text-[#ffffff] mx-[0px] mt-[0px] mb-[15px]" style={{ fontSize: 17, lineHeight: 1.7 }}>
              {t.hero.sub.split("\n").map((line, i) => (
                <span className="text-[#9a7c7c73] text-[#997b7b73] text-[#997b7b73] text-[#987b7b73] text-[#987b7b73] text-[#987b7b73] text-[#977b7b73] text-[#977b7b73] text-[#967b7b73] text-[#957b7b73] text-[#957b7b73] text-[#927b7b73] text-[#917c7c73] text-[#907c7c73] text-[#907d7d73] text-[#907d7d73] text-[#907d7d73] text-[#94858573] text-[#9b929273] text-[#aeaeae73] text-[#bababa73] text-[#c6c6c673] text-[#cfcfcf73] text-[#dddddd73] text-[#e3e3e373] text-[#e5e5e573] text-[#e6e6e673] text-[#e8e8e873] text-[#e9e9e973] text-[#e9e9e973] text-[#eaeaea73] text-[#eaeaea73] text-[#ebebeb73] text-[#ececec73] text-[#ededed73] text-[#eeeeee73] text-[#f0f0f073] text-[#f3f3f373] text-[#f4f4f473] text-[#f5f5f573] text-[#f8f8f873] text-[#f9f9f973] text-[#f9f9f973] text-[#fefefe73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff73] text-[#ffffff7a] text-[#ffffff7d] text-[#ffffff80] text-[#ffffff82] text-[#ffffff85] text-[#ffffff87] text-[#ffffff87] text-[#ffffff8a] text-[#ffffff8a] text-[#ffffff8f] text-[#ffffff91] text-[#ffffff96] text-[#ffffff99] text-[#ffffff9c] text-[#ffffff9e] text-[#ffffffa1] text-[#ffffffa1] text-[#ffffffa3] text-[#ffffffa3] text-[#ffffffa6] text-[#ffffffa6] text-[#ffffffa8] text-[#ffffffa8] text-[#ffffffab] text-[#ffffffad] text-[#ffffffb0] text-[#ffffffb0] text-[#ffffffb3] text-[#ffffffb3] text-[#ffffffb3]" key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>

            {/* Store Buttons — flex horizontal, gap:12 */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img src={appStoreBadge} alt="Download on the App Store" className="h-[44px] w-auto rounded-lg" />
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-[44px] w-auto rounded-lg" />
              </a>
            </div>

            {/* Trust numbers — flex horizontal, gap:32 */}
            <div className="flex items-center gap-8">
              {[
                { value: t.hero.statUsersValue, label: t.hero.statUsers },
                { value: "15,000+", label: t.hero.statPartners },
                { value: "4.8", label: t.hero.statStore },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{s.value}</span>
                  <span className="text-white/30 text-[#ffffffb3]" style={{ fontSize: 12 }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Phone Mockups — flex horizontal, gap:16, align-end */}
          <motion.div
            className="flex items-end justify-center gap-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Left phone */}
            <div className="hidden sm:block relative rounded-[28px] bg-[#1A1A1A] p-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ width: 150, height: 310 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#1A1A1A] rounded-b-xl z-10" />
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-white">
                <ImageWithFallback src={appScreen3} alt="RUPON" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[50px] h-[3px] bg-white/30 rounded-full" />
            </div>
            {/* Center phone (larger) */}
            <div className="relative rounded-[36px] bg-[#1A1A1A] p-[8px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]" style={{ width: 210, height: 440 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-[#1A1A1A] rounded-b-2xl z-10" />
              <div className="w-full h-full rounded-[28px] overflow-hidden bg-white">
                <ImageWithFallback src={appScreen1} alt="RUPON" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[70px] h-[4px] bg-white/30 rounded-full" />
            </div>
            {/* Right phone */}
            <div className="hidden sm:block relative rounded-[28px] bg-[#1A1A1A] p-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ width: 150, height: 310 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#1A1A1A] rounded-b-xl z-10" />
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-white">
                <ImageWithFallback src={appScreen2} alt="RUPON" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[50px] h-[3px] bg-white/30 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
