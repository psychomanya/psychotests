'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SavedSubmission } from '@/types/test';
import {
  Printer,
  Copy,
  Trash2,
  CheckCircle,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowLeft,
  Shield,
  Layers,
  ChevronDown,
} from 'lucide-react';

interface PsychologistReportViewProps {
  submission: SavedSubmission;
}

export default function PsychologistReportView({
  submission,
}: PsychologistReportViewProps) {
  const router = useRouter();
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [filterSubscale, setFilterSubscale] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState(false);

  // Restore local therapist notes for this session
  useEffect(() => {
    const key = `psych_notes_${submission.shareToken}`;
    const saved = localStorage.getItem(key);
    if (saved) setNotes(saved);
  }, [submission.shareToken]);

  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(`psych_notes_${submission.shareToken}`, val);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate clean plaintext export for client's medical/clinical record
  const handleCopyClipboardReport = async () => {
    const dateStr = new Date(submission.createdAt).toLocaleString('ru-RU');
    let text = `=================================================\n`;
    text += `ПСИХОЛОГИЧЕСКИЙ ОТЧЕТ (СЫРЫЕ ДАННЫЕ ДЛЯ СПЕЦИАЛИСТА)\n`;
    text += `Методика: ${submission.testTitle}\n`;
    text += `Дата прохождения: ${dateStr}\n`;
    text += `ID сессии: ${submission.shareToken}\n`;
    text += `Итоговый балл: ${submission.totalScore} из ${submission.maxPossibleScore}\n`;
    text += `Заключение / Категория: ${submission.levelLabel}\n`;
    text += `=================================================\n\n`;

    if (submission.subscaleScores && submission.subscaleScores.length > 0) {
      text += `ПОКАЗАТЕЛИ СУБШКАЛ:\n`;
      submission.subscaleScores.forEach((sub) => {
        text += `- ${sub.title}: ${sub.score} / ${sub.maxScore} ${
          sub.levelLabel ? `(${sub.levelLabel})` : ''
        }\n`;
      });
      text += `\n`;
    }

    if (submission.criticalFlags && submission.criticalFlags.length > 0) {
      text += `!!! КРИТИЧЕСКИЕ ДИАГНОСТИЧЕСКИЕ МАРКЕРЫ:\n`;
      submission.criticalFlags.forEach((flag) => {
        text += `[ВНИМАНИЕ] ${flag}\n`;
      });
      text += `\n`;
    }

    text += `ТАБЛИЦА СЫРЫХ ОТВЕТОВ НА КАЖДЫЙ ВОПРОС:\n`;
    submission.rawAnswers.forEach((ans) => {
      text += `${ans.questionId}. [${ans.questionText}] -> ${ans.selectedLabel} (${ans.score} б.)\n`;
    });

    if (notes.trim()) {
      text += `\nЗАМЕТКИ СПЕЦИАЛИСТА:\n${notes.trim()}\n`;
    }

    text += `\n=================================================`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Вы действительно хотите безвозвратно удалить эти результаты из базы?'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/submissions?token=${submission.shareToken}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Запись успешно удалена.');
        router.push('/');
      } else {
        alert('Не удалось удалить запись.');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении');
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(submission.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedExpires = new Date(submission.expiresAt).toLocaleDateString(
    'ru-RU',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  // Subscale filter
  const subscalesList = Array.from(
    new Set(submission.rawAnswers.map((a) => a.subscale).filter(Boolean))
  );

  const displayedAnswers =
    filterSubscale === 'all'
      ? submission.rawAnswers
      : submission.rawAnswers.filter((a) => a.subscale === filterSubscale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
      {/* Top specialist bar (hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>На главную</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyClipboardReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium transition-all active:scale-95 shadow-sm"
          >
            {copiedNotes ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать для карты</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-medium transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Печать / PDF</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 text-xs sm:text-sm font-medium transition-colors"
            title="Удалить результаты из базы"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Удалить</span>
          </button>
        </div>
      </div>

      {/* Specialist Header Header */}
      <div className="glass-card gemini-rainbow-border rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Профессиональный отчет для психолога</span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Заполнено: {formattedDate}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          {submission.testTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 mb-6 border-b border-white/[0.06]">
          <span>
            ID сессии:{' '}
            <code className="text-purple-300 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
              {submission.shareToken}
            </code>
          </span>
          <span>•</span>
          <span>Действительно до: {formattedExpires} (30 дней)</span>
        </div>

        {/* Score Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Общий сырой балл
            </span>
            <div className="text-3xl font-black text-white flex items-baseline gap-1.5">
              <span className="gemini-rainbow-text">{submission.totalScore}</span>
              <span className="text-xs font-normal text-slate-400">
                / {submission.maxPossibleScore}
              </span>
            </div>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06] sm:col-span-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Клиническая категория
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-base font-bold px-3 py-1 rounded-lg border"
                style={{
                  backgroundColor: `${submission.levelColor}15`,
                  borderColor: `${submission.levelColor}40`,
                  color: submission.levelColor,
                }}
              >
                {submission.levelLabel}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {submission.description}
            </p>
          </div>
        </div>
      </div>

      {/* Critical Red Flags Box (If applicable) */}
      {submission.criticalFlags && submission.criticalFlags.length > 0 && (
        <div className="rounded-3xl p-6 sm:p-7 bg-red-950/40 border border-red-500/40 text-red-200 mb-8 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-red-200 mb-1">
                Клинические маркеры риска (Red Flags)
              </h3>
              <p className="text-xs sm:text-sm text-red-300/90 leading-relaxed mb-3">
                Клиент дал утвердительные ответы на вопросы повышенного риска. Рекомендуется уделить приоритетное внимание на ближайшей консультации:
              </p>

              <div className="space-y-2">
                {submission.criticalFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-xs sm:text-sm text-red-100 flex items-start gap-2.5"
                  >
                    <span className="text-red-400 font-bold">•</span>
                    <span className="leading-relaxed">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscales Analysis */}
      {submission.subscaleScores && submission.subscaleScores.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] mb-8">
          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Детализация по субшкалам</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {submission.subscaleScores.map((sub) => (
              <div
                key={sub.key}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  {sub.title}
                </div>
                <div className="text-xl font-black text-white mb-2">
                  {sub.score}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    / {sub.maxScore}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round((sub.score / sub.maxScore) * 100)}%`,
                      backgroundColor: sub.color || '#8b5cf6',
                    }}
                  />
                </div>
                {sub.levelLabel && (
                  <span className="text-[11px] text-slate-400 block font-medium">
                    Степень: {sub.levelLabel}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw Answers Detailed Table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Таблица сырых ответов ({submission.rawAnswers.length} пунктов)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Точный выбор клиента по каждому вопросу методики
            </p>
          </div>

          {subscalesList.length > 0 && (
            <div className="no-print flex items-center gap-2 text-xs">
              <span className="text-slate-400">Шкала:</span>
              <select
                value={filterSubscale}
                onChange={(e) => setFilterSubscale(e.target.value)}
                className="bg-white/[0.06] text-slate-200 border border-white/[0.1] rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="all" className="bg-[#12141F]">Все шкалы</option>
                {subscalesList.map((sc) => (
                  <option key={sc} value={sc!} className="bg-[#12141F]">
                    {sc}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4 w-12">№</th>
                <th className="py-3 px-3 sm:px-4">Вопрос / Пункт</th>
                <th className="py-3 px-3 sm:px-4">Выбранный вариант ответа</th>
                <th className="py-3 px-3 sm:px-4 text-right w-20">Балл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {displayedAnswers.map((ans) => (
                <tr
                  key={ans.questionId}
                  className={`transition-colors ${
                    ans.isCritical
                      ? 'bg-red-500/10 hover:bg-red-500/15'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-3.5 px-3 sm:px-4 font-mono text-slate-400">
                    {ans.questionId}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4">
                    <span className="text-white font-medium block">
                      {ans.questionText}
                    </span>
                    {ans.subscale && (
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {ans.subscale}
                      </span>
                    )}
                    {ans.isCritical && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-red-300 bg-red-500/20 border border-red-500/30 px-2 py-0.5 rounded-full">
                        Критический пункт
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-slate-300">
                    {ans.selectedLabel}
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-bold">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg ${
                        ans.isCritical
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : ans.score > 0
                          ? 'bg-purple-500/15 text-purple-200'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      {ans.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Psychologist Clinical Notes Section (auto-saved locally) */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Заметки и гипотезы специалиста</span>
          </h3>
          <span className="text-[11px] text-slate-400 no-print">
            Сохраняются локально в вашем браузере
          </span>
        </div>

        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Запишите клинические гипотезы, план сессии или комментарии по ответам клиента..."
          rows={4}
          className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Specialist Disclaimer */}
      <div className="text-xs text-slate-400 leading-relaxed text-center sm:text-left border-t border-white/[0.06] pt-6">
        Сырые данные предназначены исключительно для использования квалифицированным психологом / психотерапевтом в рамках конфиденциального терапевтического процесса.
      </div>
    </div>
  );
}
