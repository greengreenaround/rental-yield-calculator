"use client";

import { useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "카카오톡",
    href: "https://pf.kakao.com/_bjwIX/friend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.21 4.65 6.6-.15.53-.96 3.41-1 3.56 0 .09.03.18.1.23a.26.26 0 0 0 .26.01c.35-.05 4.04-2.65 4.68-3.1.42.06.86.1 1.31.1 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hosu.air.swimming/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
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

    // 모바일: 네이티브 공유 (카톡, 메시지 등 앱 선택)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "공간임대 수익률 계산기",
          text: "내 수익률 계산 결과를 확인해보세요!",
          url,
        });
        return;
      } catch {
        // 사용자가 공유 취소한 경우 → 클립보드 복사로 fallback
      }
    }

    // 데스크탑: 클립보드 복사
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
        <div className="min-w-0">
          <h1 className="text-base font-bold text-gray-900 sm:text-xl">
            공간임대 수익률 계산기
          </h1>
          <p className="hidden text-sm text-gray-500 sm:block">
            에어비앤비 &amp; 단기임대 투자 수익률 분석
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={handleShare}
            title="현재 입력값 링크 복사"
            className="relative rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:p-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:h-5 sm:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
            </svg>
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
                복사됨!
              </span>
            )}
          </button>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
              className="hidden rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 sm:inline-flex"
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={onOpenLeadForm}
            className="ml-0.5 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 sm:ml-1 sm:px-3 sm:text-sm"
          >
            사전등록
          </button>
        </div>
      </div>
    </header>
  );
}
