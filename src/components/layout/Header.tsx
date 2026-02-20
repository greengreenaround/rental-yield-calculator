"use client";

import { useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "카카오톡",
    href: "https://pf.kakao.com/_bjwIX/friend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
        <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.21 4.65 6.6-.15.53-.96 3.41-1 3.56 0 .09.03.18.1.23a.26.26 0 0 0 .26.01c.35-.05 4.04-2.65 4.68-3.1.42.06.86.1 1.31.1 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hosu.air.swimming/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),
  },
];

interface HeaderProps {
  onOpenLeadForm: () => void;
}

export function Header({ onOpenLeadForm }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: "공간임대 수익률 계산기",
          text: "에어비앤비 & 단기임대 수익률 분석 결과를 확인해보세요!",
          url,
        });
        return;
      } catch {
        // 사용자가 공유 취소한 경우 — 무시
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
        {/* 1줄: 타이틀 + 버튼들 */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base font-bold text-gray-900 sm:text-xl">
            공간임대 수익률 계산기
          </h1>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 sm:p-2 sm:text-gray-500 sm:hover:text-gray-700"
              >
                {link.icon}
              </a>
            ))}
            <div className="group relative">
              <button
                onClick={handleShare}
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-gray-500 transition hover:bg-gray-50 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm sm:font-semibold sm:text-gray-700"
              >
                {copied ? "복사됨!" : "공유"}
              </button>
              <div className="pointer-events-none absolute right-0 top-full z-20 mt-2 hidden w-48 rounded-lg bg-gray-800 px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
                현재 계산한 수익률 결과를 링크로 복사해서 공유하거나, 저장해두면 나중에 다시 확인할 수 있어요
              </div>
            </div>
            <button
              onClick={onOpenLeadForm}
              className="rounded-md bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-blue-700 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
            >
              사전등록
            </button>
          </div>
        </div>

        {/* 2줄: 부제목 */}
        <p className="mt-1 text-xs text-gray-400 sm:text-sm sm:text-gray-500">
          에어비앤비 &amp; 단기임대 투자 수익률 분석
        </p>
      </div>
    </header>
  );
}
