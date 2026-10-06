import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-card gemini-rainbow-border rounded-3xl p-8 sm:p-12 max-w-lg text-center border border-white/[0.08]">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Результаты не найдены
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Возможно, ссылка содержит опечатку, была удалена пользователем или истек 30-дневный срок анонимного хранения в целях безопасности.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.16] text-white font-medium text-sm border border-white/[0.12] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к каталогу тестов</span>
        </Link>
      </div>
    </div>
  );
}
