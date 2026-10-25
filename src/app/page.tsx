import Link from 'next/link';
import { allTests } from '@/data/tests';
import { Clock, HelpCircle, ArrowRight } from 'lucide-react';

function getPluralTests(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${count} методик`;
  if (mod10 === 1) return `${count} методика`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} методики`;
  return `${count} методик`;
}

export default function HomePage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="gemini-rainbow-text">
            Психологические тесты
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Пройдите валидированные стандартизированные опросники анонимно. Узнайте свой уровень и мгновенно скопируйте защищенную ссылку, по которой ваш специалист увидит детальную таблицу каждого ответа.
        </p>
      </div>

      {/* Tests Catalog Grid */}
      <section id="catalog" className="mb-12 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Доступные методики</span>
              <span className="text-xs font-normal text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                {getPluralTests(allTests.length)}
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Клинически валидированные опросники с научной стандартизацией
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTests.map((test) => (
            <div
              key={test.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden border border-white/[0.08]"
            >
              {/* Subtle Rainbow Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-end gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{test.durationMinutes} мин</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5">
                  {test.title}
                </h3>
                <p className="text-xs text-purple-400 font-mono mb-3">
                  {test.subtitle}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  {test.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{test.questionsCount} вопросов</span>
                </div>

                <Link
                  href={`/test/${test.id}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.12] group-hover:border-purple-500/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] active:scale-95"
                >
                  <span>Начать</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
