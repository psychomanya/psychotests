'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SavedSubmission } from '@/types/test';
import {
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  RotateCcw,
  UserCheck,
  Trash2,
} from 'lucide-react';

import { removeFromLocalStorage } from '@/lib/submissionHelper';

interface ClientResultsViewProps {
  submission: SavedSubmission;
  encodedPayload?: string;
}

export default function ClientResultsView({ submission, encodedPayload }: ClientResultsViewProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Formulate full psychologist report URL
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const base = window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH || '');
      const param = encodedPayload ? `d=${encodedPayload}` : `token=${submission.shareToken}`;
      return `${base}/report/?${param}`;
    }
    return `/report/?token=${submission.shareToken}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleDelete = () => {
    if (
      !window.confirm(
        'Вы уверены, что хотите удалить эти результаты? Они будут немедленно стерты из памяти браузера.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    removeFromLocalStorage(submission.shareToken);
    alert('Результаты успешно удалены.');
    router.push('/');
  };

  const expirationDateFormatted = new Date(submission.expiresAt).toLocaleDateString(
    'ru-RU',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-14">
      {/* Success Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <CheckCircle className="w-3.5 h-3.5" /> Тестирование успешно завершено
        </span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {submission.testTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Ваш персональный результат и рекомендации по шкале
        </p>
      </div>

      {/* Main Result Card */}
      <div className="glass-card gemini-rainbow-border rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl mb-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Итоговая оценка
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
              <span className="gemini-rainbow-text">{submission.totalScore}</span>
              <span className="text-sm font-normal text-slate-400">
                из {submission.maxPossibleScore} баллов
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span
              className="inline-block text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border shadow-sm"
              style={{
                backgroundColor: `${submission.levelColor}15`,
                borderColor: `${submission.levelColor}40`,
                color: submission.levelColor,
              }}
            >
              {submission.levelLabel}
            </span>
          </div>
        </div>

        {/* Severity gauge bar */}
        <div className="py-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Интенсивность шкалы</span>
            <span className="font-mono text-purple-400">
              {Math.round((submission.totalScore / submission.maxPossibleScore) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-white/[0.06] rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    6,
                    Math.round(
                      (submission.totalScore / submission.maxPossibleScore) * 100
                    )
                  )
                )}%`,
                backgroundColor: submission.levelColor,
                boxShadow: `0 0 12px ${submission.levelColor}80`,
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Интерпретация результата:
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {submission.description}
          </p>
        </div>

        {/* Subscales Preview */}
        {submission.subscaleScores && submission.subscaleScores.length > 0 && (
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Показатели по отдельным шкалам:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {submission.subscaleScores.map((sub) => (
                <div
                  key={sub.key}
                  className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.05]"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">{sub.title}</span>
                    <span className="font-bold text-white">
                      {sub.score}{' '}
                      <span className="text-slate-500 font-normal">
                        / {sub.maxScore}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((sub.score / sub.maxScore) * 100)}%`,
                        backgroundColor: sub.color || '#8b5cf6',
                      }}
                    />
                  </div>
                  {sub.levelLabel && (
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Уровень: {sub.levelLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share with Psychologist Action Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/20 relative overflow-hidden mb-8 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                Отправка результатов психологу
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Перейдя по этой ссылке, ваш специалист получит доступ к профессиональному отчету:{' '}
                <strong className="text-purple-300">
                  ответ на каждый конкретный вопрос
                </strong>{' '}
                и баллы по шкалам.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <button
              onClick={handleCopyLink}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Ссылка скопирована в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать ссылку для психолога</span>
                </>
              )}
            </button>

            <Link
              href={getShareUrl()}
              target="_blank"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.1] text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Открыть отчет</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-white/[0.06] gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Ссылка защищена и будет автоматически удалена <strong>{expirationDateFormatted}</strong> (через 30 дней).
              </span>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 text-rose-400/90 hover:text-rose-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-rose-500/10 text-xs self-start sm:self-auto border border-rose-500/20 active:scale-95"
              title="Безвозвратно удалить эти результаты из базы прямо сейчас"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Удаление...' : 'Удалить сейчас'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer & Privacy Link */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 leading-relaxed mb-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <strong>Внимание:</strong> Результаты данного теста носят информационно-ориентировочный характер и не являются официальным медицинским диагнозом. Для точной постановки диагноза и назначения терапии обратитесь к дипломированному психологу или врачу-психотерапевту.
          </div>
        </div>
        <Link
          href="/privacy"
          className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2 whitespace-nowrap shrink-0 ml-7 sm:ml-0 text-[11px]"
        >
          О конфиденциальности (152-ФЗ)
        </Link>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between">
        <Link
          href={`/test/${submission.testId}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти тест заново</span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-purple-400 hover:text-purple-300 font-medium"
        >
          <span>К каталогу тестов</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
