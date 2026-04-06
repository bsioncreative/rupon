import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Footprints,
  ShieldCheck,
  BarChart3,
  Globe,
  Zap,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

import ramenHeroImg from "figma:asset/1b4742e69d0322151cdaa598e2a74fb190736e93.png";
import touristRamenImg from "figma:asset/f1fd1e9bfab77b6fe697ab9f7ad3b4ed8a555463.png";

const IMG_DASHBOARD =
  "https://images.unsplash.com/photo-1647507489316-39fc8a371fb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwbGFwdG9wfGVufDF8fHx8MTc3MzUwODcwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const IMG_TOURIST =
  "https://images.unsplash.com/photo-1767710048772-75cc3d98ffe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRvdXJpc3QlMjBjb3VwbGUlMjBleHBsb3JpbmclMjBsb2NhbCUyMGFsbGV5fGVufDF8fHx8MTc3MzUwODcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const BENEFIT_IMAGES = [
  "https://images.unsplash.com/photo-1693486145118-d963c3a6ce6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwQUklMjBwZXJzb25hbGl6ZWQlMjByZWNvbW1lbmRhdGlvbnxlbnwxfHx8fDE3NzM1NzUyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1767122226087-4d4b42507eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXZpZ2F0aW9uJTIwbWFwJTIwd2Fsa2luZyUyMGRpcmVjdGlvbiUyMGNpdHl8ZW58MXx8fHwxNzczNTc1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1733652220367-367b63bd68fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwZ2lmdCUyMGhhbmRzJTIwb2ZmZXJpbmclMjB3ZWxjb21lfGVufDF8fHx8MTc3MzU3NTI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMHNjcmVlbnxlbnwxfHx8fDE3NzM1Njk1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1651421479704-470a78eef530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGxhbmd1YWdlcyUyMGdsb2JlJTIwZGl2ZXJzZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzczNTc1Mjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1605513524042-426bace35fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxRUiUyMGNvZGUlMjBtb2JpbGUlMjBjb3Vwb24lMjBzY2FubmluZ3xlbnwxfHx8fDE3NzM1NzUyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const BENEFIT_ICONS = [Eye, Footprints, ShieldCheck, BarChart3, Globe, Zap];
const STAT_ICONS = [Users, MapPin, TrendingUp, Clock];

export function PartnersPage() {
  const { t } = useLanguage();
  const p = t.partners;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    shopName: "",
    category: "",
    city: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="main-scroll" className="size-full overflow-y-auto scroll-smooth bg-white">
      <Header />

      {/* Hero — flex horizontal, gap:48 */}
      <section
        className="relative bg-[#F6F6F6] px-5 py-20 pt-[120px] mx-[0px] my-[52px] overflow-hidden"
      >
        {/* Subtle background image */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1762661882392-40e55d2ae848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHJldGFpbCUyMGRpc3RyaWN0JTIwd2FybSUyMGFtYmlhbmNlfGVufDF8fHx8MTc3MzY1OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-[1080px] mx-auto relative">
          {/* Left Text — flex vertical, gap:24 */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-primary" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1px" }}>
                {p.heroTag}
              </span>
            </div>
            <h1
              className="text-[#111]"
              style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-1px" }}
            >
              {p.heroTitle1}<span className="text-primary">{p.heroAccent}</span><br />
              {p.heroTitle2}<br />
              {p.heroTitle3}
            </h1>
            <p className="text-[#888] max-w-[420px]" style={{ fontSize: 16, lineHeight: 1.7 }}>
              {p.heroDesc.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            {/* Stats Row */}
            <div className="flex items-center gap-8">
              {p.stats.map((s, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div key={s.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <Icon size={14} className="text-primary" />
                      <span className="text-[#111]" style={{ fontSize: 20, fontWeight: 700 }}>{s.value}</span>
                    </div>
                    <span className="text-[#AAA]" style={{ fontSize: 11 }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
            <a
              href="#apply"
              className="self-start bg-primary text-white px-7 py-4 rounded-xl hover:bg-[#C92A0E] transition-colors cursor-pointer flex items-center gap-2"
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              {p.heroCta}
              <ArrowRight size={18} />
            </a>
          </div>
          {/* Right Image */}
          <div className="flex-1 rounded-2xl overflow-hidden max-w-[480px]">
            <ImageWithFallback src={ramenHeroImg} alt={p.heroImgAlt} className="w-full h-auto object-cover" style={{ aspectRatio: "6 / 5" }} />
          </div>
        </div>
      </section>

      {/* Benefits — 6 cards */}
      <section className="bg-white px-5 py-24">
        <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {p.benefitsTag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {p.benefitsTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 w-full">
            {p.benefits.map((b, i) => (
              <div
                key={i}
                className="flex flex-col gap-0 rounded-2xl border border-[#EAEAEA] overflow-hidden flex-1 min-w-[280px] hover:border-[#DDD] transition-colors"
              >
                <div className="w-full h-[140px] overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={BENEFIT_IMAGES[i]}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-[#111]" style={{ fontSize: 17, fontWeight: 700 }}>{b.title}</h3>
                    <p className="text-[#888]" style={{ fontSize: 13, lineHeight: 1.7 }}>{b.desc}</p>
                  </div>
                  <span className="self-start text-primary bg-primary/8 rounded-md px-3 py-1.5" style={{ fontSize: 12, fontWeight: 600 }}>
                    {b.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — visual with images */}
      <section className="bg-[#F6F6F6] px-5 py-24">
        <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {p.howTag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {p.howTitle}
            </h2>
            <p className="text-[#888] max-w-[400px]" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {p.howDesc}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full">
            {p.steps.map((s, i, arr) => (
              <div key={s.num} className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="flex flex-col gap-3 bg-white rounded-2xl border border-[#EAEAEA] p-6 flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0"
                      style={{ fontSize: 12, fontWeight: 800 }}
                    >
                      {s.num}
                    </span>
                    <h3 className="text-[#111]" style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</h3>
                  </div>
                  <p className="text-[#888]" style={{ fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden md:block text-[#CCC] shrink-0 text-[#000000]" style={{ fontSize: 18 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview + Testimonials */}
      <section className="bg-white px-5 py-24">
        <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
          {/* Dashboard */}
          <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
            <div className="flex-1 rounded-2xl overflow-hidden border border-[#EAEAEA]">
              <ImageWithFallback src={IMG_DASHBOARD} alt={p.dashboardImgAlt} className="w-full h-auto" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
                {p.dashboardTag}
              </span>
              <h2 className="text-[#111]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                {p.dashboardTitle}
              </h2>
              <p className="text-[#888]" style={{ fontSize: 15, lineHeight: 1.7 }}>
                {p.dashboardDesc.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
              <div className="flex flex-wrap gap-3">
                {p.dashboardFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 bg-[#F6F6F6] rounded-lg px-3 py-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" />
                    <span className="text-[#555]" style={{ fontSize: 12, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tourist Image + text */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full">
            <div className="flex-1 rounded-2xl overflow-hidden">
              <ImageWithFallback src={touristRamenImg} alt={p.impactImgAlt} className="w-full h-auto object-cover" style={{ aspectRatio: "16 / 9" }} />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
                {p.impactTag}
              </span>
              <h2 className="text-[#111]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                {p.impactTitle}
              </h2>
              <p className="text-[#888]" style={{ fontSize: 15, lineHeight: 1.7 }}>
                {p.impactDesc.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
              <div className="flex items-center gap-6">
                {p.impactStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-primary" style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</span>
                    <span className="text-[#AAA]" style={{ fontSize: 11 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col items-center gap-8 w-full px-[0px] py-[63px]">
            <h3 className="text-[#111]" style={{ fontSize: 22, fontWeight: 700 }}>{p.testimonialsTitle}</h3>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {p.testimonials.map((tm) => (
                <div key={tm.name} className="flex-1 flex flex-col gap-4 bg-[#F6F6F6] rounded-xl p-6">
                  <p className="text-[#333] flex-1" style={{ fontSize: 14, lineHeight: 1.7 }}>
                    "{tm.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#111]" style={{ fontSize: 13, fontWeight: 600 }}>{tm.name}</span>
                    <span className="text-[#AAA]" style={{ fontSize: 11 }}>{tm.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F6F6F6] px-5 py-24">
        <div className="flex flex-col items-center gap-12 max-w-[720px] mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {p.faqTag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {p.faqTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {p.faqs.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#EAEAEA] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 cursor-pointer text-left"
                >
                  <span className="text-[#111] flex-1" style={{ fontSize: 15, fontWeight: 600 }}>{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#AAA] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[#888]" style={{ fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-white px-5 py-24">
        <div className="flex flex-col items-center gap-12 max-w-[600px] mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-primary" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
              {p.applyTag}
            </span>
            <h2
              className="text-[#111]"
              style={{ fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "-0.5px", lineHeight: 1.2 }}
            >
              {p.applyTitle}
            </h2>
            <p className="text-[#888]" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {p.applyDesc}
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 bg-[#F0FAF4] rounded-2xl px-10 py-12 w-full text-center">
              <CheckCircle2 size={48} className="text-emerald-500" />
              <h3 className="text-[#111]" style={{ fontSize: 22, fontWeight: 700 }}>{p.successTitle}</h3>
              <p className="text-[#888]" style={{ fontSize: 14, lineHeight: 1.7 }}>
                {p.successDesc}
              </p>
              <Link
                to="/"
                className="text-primary flex items-center gap-1 mt-2 hover:underline"
                style={{ fontSize: 14, fontWeight: 600 }}
              >
                <ArrowLeft size={16} /> {p.successBack}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              {/* Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formShopName} <span className="text-primary">*</span></label>
                  <input
                    required
                    type="text"
                    placeholder={p.formShopNamePlaceholder}
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="border border-[#E0E0E0] rounded-xl px-4 py-3 text-[#111] placeholder:text-[#CCC] focus:border-primary focus:outline-none transition-colors"
                    style={{ fontSize: 14 }}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formCategory} <span className="text-primary">*</span></label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border border-[#E0E0E0] rounded-xl px-4 pr-10 py-3 text-[#111] focus:border-primary focus:outline-none transition-colors bg-white appearance-none"
                    style={{ fontSize: 14, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">{p.formCategoryPlaceholder}</option>
                    {p.formCategoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formCity} <span className="text-primary">*</span></label>
                <input
                  required
                  type="text"
                  placeholder={p.formCityPlaceholder}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="border border-[#E0E0E0] rounded-xl px-4 py-3 text-[#111] placeholder:text-[#CCC] focus:border-primary focus:outline-none transition-colors"
                  style={{ fontSize: 14 }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formContact} <span className="text-primary">*</span></label>
                  <input
                    required
                    type="text"
                    placeholder={p.formContactPlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border border-[#E0E0E0] rounded-xl px-4 py-3 text-[#111] placeholder:text-[#CCC] focus:border-primary focus:outline-none transition-colors"
                    style={{ fontSize: 14 }}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formEmail} <span className="text-primary">*</span></label>
                  <input
                    required
                    type="email"
                    placeholder="partner@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border border-[#E0E0E0] rounded-xl px-4 py-3 text-[#111] placeholder:text-[#CCC] focus:border-primary focus:outline-none transition-colors"
                    style={{ fontSize: 14 }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#555]" style={{ fontSize: 12, fontWeight: 600 }}>{p.formPhone}</label>
                <input
                  type="tel"
                  placeholder={p.formPhonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border border-[#E0E0E0] rounded-xl px-4 py-3 text-[#111] placeholder:text-[#CCC] focus:border-primary focus:outline-none transition-colors"
                  style={{ fontSize: 14 }}
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white py-4 rounded-xl hover:bg-[#C92A0E] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                {p.formSubmit}
                <ArrowRight size={18} />
              </button>
              <p className="text-center text-[#BBB]" style={{ fontSize: 11 }}>
                {p.formConsent}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Bottom Bar */}
      <Footer />
    </div>
  );
}