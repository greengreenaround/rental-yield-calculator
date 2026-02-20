"use client";

import { useState, useEffect, FormEvent } from "react";

const STORAGE_KEY = "lead_popup_dismissed";
const POPUP_DELAY_MS = 10_000;

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby6tfO9WBNmibnl9SJdbLd0NG_kTrKPZoQPE3-YqQt5i-Pt8Ave_SwvYIK6EVU23_s/exec";

interface LeadCapturePopupProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export function LeadCapturePopup({
  externalOpen,
  onExternalClose,
}: LeadCapturePopupProps) {
  const [autoOpen, setAutoOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", feedback: "" });

  const isOpen = autoOpen || externalOpen;

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setAutoOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setAutoOpen(false);
    onExternalClose?.();
    localStorage.setItem(STORAGE_KEY, "1");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // 즉시 완료 표시, 백그라운드로 전송
    setIsSubmitted(true);
    setTimeout(dismiss, 2000);

    navigator.sendBeacon(
      APPS_SCRIPT_URL,
      new Blob([JSON.stringify(form)], { type: "application/json" }),
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mb-3 text-4xl">&#10003;</div>
            <p className="text-lg font-semibold text-gray-900">
              신청이 완료되었습니다!
            </p>
            <p className="mt-1 text-sm text-gray-500">
              출시 소식을 가장 먼저 알려드릴게요.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                사전 알림 신청
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                수익 분석 기능, 준비 중입니다
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                운영하면서 실제 수익을 분석할 수 있는 기능을 만들고 있어요.
                <br />
                출시되면 가장 먼저 알려드릴게요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="이름"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="연락처 (010-0000-0000)"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="이메일"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                placeholder="개선 사항이나 필요한 기능이 있다면 알려주세요 (선택)"
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                rows={2}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                출시 소식 받기
              </button>
            </form>

            <button
              onClick={dismiss}
              className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600"
            >
              다음에 할게요
            </button>
          </>
        )}
      </div>
    </div>
  );
}
