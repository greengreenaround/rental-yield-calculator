const SOCIAL_LINKS = [
  {
    name: "카카오톡",
    href: "https://pf.kakao.com/_bjwIX/friend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.21 4.65 6.6-.15.53-.96 3.41-1 3.56 0 .09.03.18.1.23a.26.26 0 0 0 .26.01c.35-.05 4.04-2.65 4.68-3.1.42.06.86.1 1.31.1 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hosu.air.swimming/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@hosu.air.swimming",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="h-4 w-4">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.216 34.672.475 10.036 5.186 18.689 13.274 24.356 6.836 4.795 15.632 7.166 24.775 6.68 12.085-.643 21.57-5.181 28.186-13.478 5.024-6.3 8.19-14.425 9.597-24.69 5.763 3.473 10.05 8.072 12.549 13.633 4.14 9.216 4.384 24.347-3.015 31.746-6.52 6.52-14.353 9.327-27.452 9.42-14.499-.1-25.46-4.76-32.569-13.836-6.651-8.494-10.09-20.585-10.228-35.922.138-15.337 3.577-27.428 10.228-35.922 7.109-9.076 18.07-13.736 32.569-13.836 14.602.1 25.723 4.8 33.052 13.962 3.565 4.458 6.268 10.09 8.093 16.74l14.943-3.994c-2.327-8.636-6.016-16.065-11.1-22.42C152.32 30.396 138.19 24.476 120.5 24.34h-.115c-17.612.13-31.675 6.07-41.802 17.644-8.862 10.126-13.687 23.88-13.96 39.77v.508c.273 15.89 5.098 29.644 13.96 39.77 10.127 11.574 24.19 17.514 41.802 17.644h.115c16.123-.107 27.322-4.53 36.245-13.453 11.677-11.677 11.18-32.81 5.124-46.244-4.342-9.637-12.466-17.38-24.332-22.991zM100.28 130.47c-10.134.553-20.684-3.988-21.2-14.893-.383-8.074 5.686-17.06 25.256-18.186 2.21-.127 4.377-.186 6.5-.186 6.256 0 12.108.56 17.408 1.643-1.982 22.617-15.832 31.069-27.964 31.622z" />
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
