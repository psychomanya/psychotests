'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderCatalogButton() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      const el = document.getElementById('catalog');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        // Optionally update URL hash without jump
        window.history.pushState(null, '', '#catalog');
      }
    }
  };

  return (
    <Link
      href="/#catalog"
      onClick={handleClick}
      className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 transition-all font-medium active:scale-95 cursor-pointer"
    >
      Каталог тестов
    </Link>
  );
}
