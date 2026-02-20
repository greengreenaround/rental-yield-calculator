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
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            공간임대 수익률 계산기
          </h1>
          <p className="text-sm text-gray-500">
            에어비앤비 &amp; 단기임대 투자 수익률 분석
          </p>
        </div>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
              className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={onOpenLeadForm}
            className="ml-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            사전등록
          </button>
        </div>
      </div>
    </header>
  );
}
