import { useState, useRef } from "react";
import {
  MapPin,
  Store,
  ShoppingBag,
  QrCode,
  Star,
  Percent,
  ChevronRight,
  Heart,
  Search,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

import imgScreenCoupon from "../../assets/3dec1c2eb441333ba5a3fe694c127b75e2b773d4.png";
import imgScreenQR from "../../assets/3022366179de537a3ea63a6a6a870ea03c112c63.png";
import imgScreenStore from "../../assets/dddacefcd3b8947a2497a4a1d83662b0606520e8.png";
import imgScreenDutyFree from "../../assets/f4171c8e4a6c29057fcf80262013e4b8d258fa83.png";

const IMG_COUPON = imgScreenCoupon;
const IMG_STORE = imgScreenStore;
const IMG_DUTYFREE = imgScreenDutyFree;

/* ── Phone Status Bar ──────────────────────────────── */
function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1">
      <span className="text-white" style={{ fontSize: 11, fontWeight: 600 }}>
        9:41
      </span>
      <div className="flex items-center gap-1">
        <Signal size={11} className="text-white" />
        <Wifi size={11} className="text-white" />
        <Battery size={11} className="text-white" />
      </div>
    </div>
  );
}

/* ── Phone App Screens ─────────────────────────────── */

function ScreenCoupon() {
  const coupons = [
    {
      name: "이치란 라멘 도톤보리",
      tag: "10% OFF",
      dist: "350m",
      img: IMG_COUPON,
    },
    {
      name: "오사카 말차 하우스",
      tag: "무료 디저트",
      dist: "800m",
      img: IMG_STORE,
    },
    {
      name: "Matsumoto Kiyoshi",
      tag: "TAX FREE",
      dist: "1.2km",
      img: IMG_DUTYFREE,
    },
  ];
  return (
    <div className="flex flex-col h-full bg-[#F6F6F6]">
      {/* Header */}
      <div className="bg-primary px-4 pb-4 pt-1 flex flex-col gap-3">
        <PhoneStatusBar />
        <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
          <Search size={14} className="text-white/70" />
          <span className="text-white/60" style={{ fontSize: 12 }}>
            쿠폰 · 매장 검색
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-white" />
          <span className="text-white/90" style={{ fontSize: 11 }}>
            현재 위치 기반 · 5km 이내
          </span>
        </div>
      </div>

      {/* Coupon List */}
      <div className="flex flex-col gap-2.5 p-3 flex-1 overflow-hidden">
        <span
          className="text-[#555] px-1"
          style={{ fontSize: 10, fontWeight: 600 }}
        >
          내 주변 혜택 3건
        </span>
        {coupons.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-xl flex items-center gap-3 p-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <ImageWithFallback
                src={c.img}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span
                className="text-[#222] truncate"
                style={{ fontSize: 11, fontWeight: 600 }}
              >
                {c.name}
              </span>
              <span className="text-[#BBB]" style={{ fontSize: 9 }}>
                {c.dist}
              </span>
            </div>
            <span
              className="text-primary bg-primary/8 rounded-lg px-2 py-1 shrink-0"
              style={{ fontSize: 9, fontWeight: 700 }}
            >
              {c.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenStore() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Store Cover */}
      <div className="relative h-[140px] shrink-0">
        <ImageWithFallback
          src={IMG_STORE}
          alt="store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-0 left-0 right-0">
          <PhoneStatusBar />
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-1.5">
          <Heart size={14} className="text-primary" />
        </div>
      </div>
      {/* Store Info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-[#111]" style={{ fontSize: 15, fontWeight: 700 }}>
            도자기 공방 다나카
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                className={
                  s <= 4
                    ? "text-amber-400 fill-amber-400"
                    : "text-[#DDD] fill-[#DDD]"
                }
              />
            ))}
            <span className="text-[#AAA] ml-1" style={{ fontSize: 10 }}>
              4.2 (128)
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["분위기 좋아요", "카드 결제 OK", "영어 가능", "체험 가능"].map(
            (t) => (
              <span
                key={t}
                className="bg-[#F3F3F3] text-[#777] rounded-full px-2.5 py-1"
                style={{ fontSize: 9, fontWeight: 500 }}
              >
                {t}
              </span>
            )
          )}
        </div>
        <div className="bg-[#F6F6F6] rounded-xl p-3 flex flex-col gap-1.5">
          <span className="text-[#888]" style={{ fontSize: 9, fontWeight: 600 }}>
            최근 리뷰
          </span>
          <p className="text-[#555]" style={{ fontSize: 10, lineHeight: 1.5 }}>
            "조용한 골목에 숨어있는 보물 같은 곳! 직접 만드는 체험도 가능해요.
            주인 아주머니가 너무 친절해요 😊"
          </p>
          <span className="text-[#BBB]" style={{ fontSize: 8 }}>
            — 서울여행자 · 2일 전
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenDutyFree() {
  const shops = [
    { brand: "Matsumoto Kiyoshi", type: "드럭스토어", badge: "TAX FREE" },
    { brand: "Don Quijote", type: "면세 종합", badge: "TAX FREE" },
    { brand: "Daimaru 백화점", type: "럭셔리", badge: "TAX FREE" },
  ];
  return (
    <div className="flex flex-col h-full bg-[#F6F6F6]">
      <div className="bg-white px-4 pb-3 pt-0">
        <PhoneStatusBar />
        <div className="flex items-center gap-2 pt-2">
          <ShoppingBag size={16} className="text-primary" />
          <span
            className="text-[#111]"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            면세 브랜드숍
          </span>
        </div>
      </div>
      {/* Filters */}
      <div className="flex gap-2 px-4 py-2.5">
        {["전체", "드럭스토어", "백화점", "브랜드"].map((f, i) => (
          <span
            key={f}
            className={`rounded-full px-3 py-1 ${
              i === 0
                ? "bg-primary text-white"
                : "bg-white text-[#888] border border-[#E5E5E5]"
            }`}
            style={{ fontSize: 10, fontWeight: 600 }}
          >
            {f}
          </span>
        ))}
      </div>
      {/* Shop List */}
      <div className="flex flex-col gap-2.5 px-3 flex-1">
        {shops.map((s) => (
          <div
            key={s.brand}
            className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
              <ShoppingBag size={16} className="text-violet-500" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span
                className="text-[#222] truncate"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {s.brand}
              </span>
              <span className="text-[#AAA]" style={{ fontSize: 9 }}>
                {s.type}
              </span>
            </div>
            <span
              className="text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1 shrink-0"
              style={{ fontSize: 9, fontWeight: 700 }}
            >
              {s.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenQR() {
  return (
    <div className="flex flex-col h-full bg-white items-center">
      <div className="w-full">
        <PhoneStatusBar />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 flex-1 px-6">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
          <Percent size={16} className="text-emerald-500" />
        </div>
        <span
          className="text-[#111] text-center"
          style={{ fontSize: 15, fontWeight: 700 }}
        >
          이치란 라멘 10% 할인
        </span>
        {/* QR Code area */}
        <div className="w-32 h-32 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#E5E5E5]">
          <QrCode size={52} className="text-[#CCC]" />
        </div>
        <div className="flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-1.5">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span style={{ fontSize: 11, fontWeight: 600 }}>쿠폰 활성화됨</span>
        </div>
        <span className="text-[#BBB] text-center" style={{ fontSize: 10 }}>
          매장 직원에게 이 화면을 보여주세요
        </span>
      </div>
      <div className="pb-6 flex flex-col items-center gap-1">
        <span className="text-[#DDD]" style={{ fontSize: 8 }}>
          유효기간: 2026.03.14 까지
        </span>
      </div>
    </div>
  );
}

/* ── Feature data ────────────────────────────────────── */

const featureIcons = [MapPin, QrCode, Store, ShoppingBag];
const featureScreens = [ScreenCoupon, ScreenQR, ScreenStore, ScreenDutyFree];
const featureScreenImgs = [imgScreenCoupon, imgScreenQR, imgScreenStore, imgScreenDutyFree];

/* ── Main Component ──────────────────────────────────── */

export function AppFeaturesSection() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const { t } = useLanguage();
  const touchStartX = useRef(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const features = t.features.items.map((item, i) => ({
    icon: featureIcons[i],
    title: item.title,
    desc: item.desc,
    screen: featureScreens[i],
    screenImg: featureScreenImgs[i],
  }));

  const handleSetActive = (idx: number) => {
    setPrevActive(active);
    setActive(idx);
  };

  const direction = active > prevActive ? 1 : -1;

  const slideVariants = {
    enter: (d: number) => ({ x: `${d * 100}%` }),
    center: { x: "0%" },
    exit: (d: number) => ({ x: `${d * -100}%` }),
  };

  return (
    <section id="features" className="bg-white py-24 px-[20px] pt-[96px] pb-[72px]">
      <div className="flex flex-col items-center gap-14 max-w-[1080px] mx-auto">
        {/* Section Header */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="text-primary"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}
            >
              {t.features.tag}
            </span>
            <h2
              className="text-[#111]"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              {t.features.title.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && t.features.title.includes("\n") && <br />}</span>
              ))}
            </h2>
            <p
              className="text-[#888] max-w-[400px]"
              style={{ fontSize: 15, lineHeight: 1.7 }}
            >
              {t.features.desc.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Interactive Feature Showcase */}
        <AnimateOnScroll preset="fadeUp" delay={0.1} className="w-full">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-14 w-full items-center lg:items-stretch">
            {/* Desktop Feature Tabs — vertical, hidden on mobile */}
            <div className="hidden lg:flex flex-col gap-2 flex-1 w-full lg:w-auto lg:justify-center">
              {features.map((f, idx) => {
                const Icon = f.icon;
                const isActive = idx === active;
                return (
                  <button
                    key={f.title}
                    onClick={() => handleSetActive(idx)}
                    className={`flex items-center gap-4 rounded-2xl text-left transition-all cursor-pointer border ${ isActive ? "bg-primary border-primary" : "bg-[#F6F6F6] border-transparent hover:bg-[#F3F3F1]" } mx-[0px] my-[3px] px-[32px] py-[35px]`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-white/20" : "bg-[#ECECEC]"
                      }`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className={isActive ? "text-white" : "text-[#999]"}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span
                        className={isActive ? "text-white" : "text-[#555]"}
                        style={{ fontSize: 14, fontWeight: 600 }}
                      >
                        {f.title}
                      </span>
                      <p
                        className={`transition-colors ${isActive ? "text-white/70" : "text-[#BBB]"}`}
                        style={{ fontSize: 12, lineHeight: 1.5 }}
                      >
                        {f.desc}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`shrink-0 transition-colors ${
                        isActive ? "text-white" : "text-[#CCC]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Phone Mockup */}
            <div className="flex items-center justify-center shrink-0">
              <div className="relative flex items-center">
                {/* Phone Frame — fixed size */}
                <div
                  className="relative rounded-[36px] bg-[#1A1A1A] p-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  style={{ width: 260, height: 564 }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-[#1A1A1A] rounded-b-2xl z-10" />
                  {/* Screen */}
                  <div className="w-full h-full rounded-[28px] overflow-hidden bg-white relative">
                    <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                      <motion.img
                        key={active}
                        custom={direction}
                        src={features[active].screenImg}
                        alt={features[active].title}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    </AnimatePresence>
                  </div>
                  {/* Home indicator */}
                  <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[80px] h-[4px] bg-white/30 rounded-full" />
                </div>
                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-primary text-white rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <span style={{ fontSize: 11, fontWeight: 700 }}>RUPON</span>
                </div>
              </div>
            </div>

            {/* Mobile Feature Tabs — horizontal swipeable, hidden on desktop */}
            <div
              ref={mobileScrollRef}
              className="lg:hidden w-full flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none" }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  const nextIdx = diff > 0
                    ? Math.min(active + 1, features.length - 1)
                    : Math.max(active - 1, 0);
                  handleSetActive(nextIdx);
                  const container = mobileScrollRef.current;
                  if (container) {
                    const card = container.children[nextIdx] as HTMLElement;
                    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }
                }
              }}
            >
              {features.map((f, idx) => {
                const Icon = f.icon;
                const isActive = idx === active;
                return (
                  <button
                    key={f.title}
                    onClick={() => {
                      handleSetActive(idx);
                      const container = mobileScrollRef.current;
                      if (container) {
                        const card = container.children[idx] as HTMLElement;
                        if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                      }
                    }}
                    className={`snap-center shrink-0 w-[85%] flex items-center gap-3 rounded-2xl text-left transition-all border px-4 py-4 ${
                      isActive ? "bg-primary border-primary" : "bg-[#F6F6F6] border-transparent"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-white/20" : "bg-[#ECECEC]"
                      }`}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        className={isActive ? "text-white" : "text-[#999]"}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span
                        className={isActive ? "text-white" : "text-[#555]"}
                        style={{ fontSize: 13, fontWeight: 600 }}
                      >
                        {f.title}
                      </span>
                      <p
                        className={`transition-colors line-clamp-2 ${isActive ? "text-white/70" : "text-[#BBB]"}`}
                        style={{ fontSize: 11, lineHeight: 1.4 }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile dot indicators */}
            <div className="lg:hidden flex items-center justify-center gap-1.5">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-full transition-all ${
                    idx === active ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-[#DDD]"
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
