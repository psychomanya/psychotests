import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';
import BrainLogo from '@/components/BrainLogo';
import HeaderCatalogButton from '@/components/HeaderCatalogButton';

export const metadata: Metadata = {
  title: 'Психологические тесты | Валидированные методики и отчет для специалиста',
  description:
    'Пройдите клинические опросники (BDI-II, BAI, MBI) анонимно и поделитесь сырыми ответами со своим психологом.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col relative selection:bg-purple-500/30 selection:text-white">
        {/* Ambient Gemini Mobile Rainbow Glow */}
        <div className="gemini-bg-glow" aria-hidden="true">
          <div className="gemini-orb-1" />
          <div className="gemini-orb-2" />
          <div className="gemini-orb-3" />
        </div>

        {/* Top Header */}
        <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-xl bg-[#08090E]/60 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 group transition-transform active:scale-95"
            >
              <BrainLogo />
              <span className="font-semibold text-lg sm:text-xl tracking-tight">
                Психо<span className="gemini-rainbow-text font-bold">Тест</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <HeaderCatalogButton />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/[0.06] bg-[#08090E]/80 backdrop-blur-md py-8 text-xs text-slate-400 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-slate-400">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>Создано для осознанной заботы о ментальном здоровье и удобного взаимодействия с психологом.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-400 text-[11px]">
              <span>Не является медицинским диагнозом.</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <Link
                href="/privacy"
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
              >
                Конфиденциальность и хранение данных
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
