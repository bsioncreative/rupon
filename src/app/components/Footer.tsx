import { Instagram, Twitter, Youtube, Mail, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimateOnScroll } from "./AnimateOnScroll";
import logoWhite from "../../assets/d30d50279da8ad4f96a82b5bb26f620b094c7725.png";
import appStoreBadge from "../../assets/b0b18c1e603a73879ce19dd04067fadfcfa3ccfc.png";
import googlePlayBadge from "../../assets/af49cd5d1ffa6da8aa01dd742b92934b5b4fc1c5.png";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n/translations";

const LANGS: Lang[] = ["KR", "JP", "EN"];

/* ── 모달 콘텐츠 ─────────────────────────────────── */
const PRIVACY_CONTENT = `
주식회사 루폰(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.

1. 수집하는 개인정보 항목
회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.
• 필수항목: 이메일 주소, 닉네임, 비밀번호
• 선택항목: 프로필 사진, 여행 선호도
• 자동 수집항목: 서비스 이용기록, 접속 로그, 쿠키, IP 주소, 기기정보

2. 개인정보의 수집·이용 목적
• 회원 가입 및 관리, 본인 확인
• AI 기반 맞춤 여행 루트 추천 서비스 제공
• 서비스 개선 및 신규 기능 개발
• 불법·부정 이용 방지

3. 개인정보의 보유 및 이용 기간
회원 탈퇴 시까지 보유하며, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
• 계약 또는 청약철회 등에 관한 기록: 5년
• 소비자 불만 또는 분쟁 처리에 관한 기록: 3년
• 접속에 관한 기록: 3개월

4. 개인정보의 제3자 제공
회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 이용자의 사전 동의가 있거나 법령에 의한 경우는 예외로 합니다.

5. 개인정보 처리의 위탁
서비스 향상을 위해 개인정보 처리를 위탁할 수 있으며, 위탁 시 관련 법령에 따라 안전하게 관리합니다.

6. 이용자의 권리와 행사 방법
이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리정지를 요청할 수 있습니다. 요청은 앱 설정 또는 고객센터(support@rupon.io)를 통해 가능합니다.

7. 개인정보 보호책임자
• 성명: 김루폰
• 직위: CPO
• 이메일: privacy@rupon.io
`.trim();

const TERMS_CONTENT = `
주식회사 루폰(이하 "회사") 서비스 이용약관

제1조 (목적)
본 약관은 회사가 제공하는 RUPON 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무를 규정함을 목적으로 합니다.

제2조 (정의)
① "서비스"란 AI 기반 여행 루트 추천, 현지 매장 연결 등 회사가 제공하는 일체의 서비스를 의미합니다.
② "이용자"란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
③ "파트너"란 회사와 제휴 계약을 체결한 매장·사업자를 의미합니다.

제3조 (약관의 효력 및 변경)
① 본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
② 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경 시 적용일자 및 변경 사유를 7일 전 공지합니다.

제4조 (서비스의 제공)
① 회사는 다음의 서비스를 제공합니다.
  • AI 맞춤 여행 루트 생성 및 추천
  • 현지 파트너 매장 정보 및 쿠폰 제공
  • 실시간 루트 최적화
② 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다.

제5조 (이용자의 의무)
① 이용자는 관련 법령, 본 약관, 이용안내 등을 준수하여야 합니다.
② 이용자는 타인의 정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.
③ 이용자는 서비스를 이용하여 영리 목적의 활동을 할 수 없습니다.

제6조 (서비스 이용의 제한)
회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.
  • 본 약관을 위반한 경우
  • 서비스 운영을 고의로 방해한 경우
  • 기타 관련 법령에 위배되는 행위를 한 경우

제7조 (면책조항)
① 회사는 천재지변 등 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
② AI가 추천하는 루트 및 정보는 참고용이며, 이용자의 최종 판단에 따라 이용하시기 바랍니다.

제8조 (분쟁 해결)
서비스 이용과 관련한 분쟁은 대한민국 법을 준거법으로 하며, 서울중앙지방법원을 제1심 관할법원으로 합니다.

부칙
본 약관은 2026년 1월 1일부터 시행합니다.
`.trim();

/* ── 법적 모달 컴포넌트 ─────────────────────────── */
function LegalModal({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  const { t } = useLanguage();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl w-full max-w-[640px] max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee] shrink-0">
          <h2 className="text-[#111]" style={{ fontSize: 17, fontWeight: 700 }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0f0] transition-colors cursor-pointer"
          >
            <X size={18} className="text-[#999]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div
            className="text-[#444] whitespace-pre-wrap"
            style={{ fontSize: 13, lineHeight: 1.85 }}
          >
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#eee] shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#E23111] hover:bg-[#c82a0e] text-white rounded-lg px-5 py-2.5 transition-colors cursor-pointer"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {t.footer.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Footer 컴포넌트 ──────────────────────────────── */
export function Footer() {
  const [modal, setModal] = useState<"privacy" | "terms" | null>(null);
  const { lang, setLang, t } = useLanguage();

  return (
    <>
      <footer className="bg-[#111] text-white px-5 pt-12 pb-8 bg-[#252525]">
        <AnimateOnScroll preset="fadeUp" duration={0.7}>
          <div className="flex flex-col gap-10 max-w-[1080px] mx-auto">
            {/* Top Row */}
            <div className="flex flex-col md:flex-row gap-10 pb-10 border-b border-white/8">
              {/* Brand Column */}
              <div className="flex flex-col gap-5 shrink-0">
                <img
                  src={logoWhite}
                  alt="RUPON"
                  className="h-[20px] w-auto self-start"
                />
                <p className="text-white/35 whitespace-nowrap" style={{ fontSize: 13, lineHeight: 1.7 }}>
                  {t.footer.brandDesc}
                </p>

                {/* Customer Support */}
                <div className="flex flex-col gap-2">
                  <span className="text-white/25" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px" }}>
                    {t.footer.cs}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-white/30" />
                      <span className="text-white/45" style={{ fontSize: 12 }}>support@rupon.io</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-white/30" />
                      <span className="text-white/45" style={{ fontSize: 12 }}>02-1234-5678</span>
                    </div>
                    <p className="text-white/25" style={{ fontSize: 11 }}>
                      {t.footer.csHours}
                    </p>
                  </div>
                </div>

                {/* App Buttons */}
                <div className="flex gap-2">
                  <a href="https://apps.apple.com" className="cursor-pointer">
                    
                  </a>
                  <a href="https://play.google.com" className="cursor-pointer">
                    
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  {[Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center hover:bg-white/12 transition-colors">
                      <Icon size={14} className="text-white/40" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-[0px] pt-[0px] pb-[1px]">
              {/* Lang Switcher */}
              <div className="flex items-center gap-1.5">
                {LANGS.map((l, i) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <button
                      onClick={() => setLang(l)}
                      className={`cursor-pointer transition-colors ${l === lang ? "text-primary" : "text-white/30 hover:text-white/50"}`}
                      style={{ fontSize: 11, fontWeight: 600 }}
                    >
                      {l}
                    </button>
                    {i < 2 && <span className="text-white/15">·</span>}
                  </div>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setModal("privacy")}
                  className="text-white/30 hover:text-white/50 transition-colors cursor-pointer bg-transparent border-none"
                  style={{ fontSize: 11 }}
                >
                  {t.footer.privacy}
                </button>
                <span className="text-white/10">|</span>
                <button
                  onClick={() => setModal("terms")}
                  className="text-white/30 hover:text-white/50 transition-colors cursor-pointer bg-transparent border-none"
                  style={{ fontSize: 11 }}
                >
                  {t.footer.terms}
                </button>
              </div>

              {/* Copyright */}
              <p className="text-white/20" style={{ fontSize: 11 }}>
                © 2026 RUPON Inc. All rights reserved.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </footer>

      {/* Modals */}
      <LegalModal
        open={modal === "privacy"}
        onClose={() => setModal(null)}
        title={t.footer.privacy}
        content={PRIVACY_CONTENT}
      />
      <LegalModal
        open={modal === "terms"}
        onClose={() => setModal(null)}
        title={t.footer.terms}
        content={TERMS_CONTENT}
      />
    </>
  );
}
