'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClientTestDefinition } from '@/types/test';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  HelpCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface TestRunnerProps {
  test: ClientTestDefinition;
}

export default function TestRunner({ test }: TestRunnerProps) {
  const router = useRouter();

  // State: -1 = Intro screen, 0..N-1 = Question index, N = Completed / Submitting
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setError] = useState<string | null>(null);

  const totalQuestions = test.questions.length;
  const currentQuestion = test.questions[currentIndex];

  const answeredCount = Object.keys(answers).length;
  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Handle option select with soft auto-advance
  const handleSelectOption = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    // Soft auto-advance after 280ms
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 280);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(-1);
    }
  };

  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      // Find first unanswered question
      const firstUnanswered = test.questions.findIndex(
        (q) => answers[q.id] === undefined
      );
      if (firstUnanswered !== -1) {
        setCurrentIndex(firstUnanswered);
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: test.id,
          answers,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при сохранении результатов');
      }

      // Route to the client results screen with shareToken
      router.push(`/results/${data.shareToken}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Произошла непредвиденная ошибка');
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex < 0 || currentIndex >= totalQuestions || isSubmitting) return;

      // Numbers 1..9 for options
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && currentQuestion && num >= 1 && num <= currentQuestion.options.length) {
        const option = currentQuestion.options[num - 1];
        handleSelectOption(currentQuestion.id, option.value);
      }

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight' && answers[currentQuestion.id] !== undefined) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, answers, isSubmitting]);

  // Screen 1: Intro / Instructions
  if (currentIndex === -1) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>К списку тестов</span>
        </button>

        <div className="glass-card gemini-rainbow-border rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{test.durationMinutes} мин
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> {test.questionsCount} вопросов
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
            {test.title}
          </h1>
          <p className="text-xs sm:text-sm text-purple-400 font-mono mb-4">
            {test.subtitle}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {test.description}
          </p>

          {/* Prominent Instructions Raised Up with Larger Font */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-8">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 font-mono">
              Инструкция:
            </h4>
            <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
              {test.instructions}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentIndex(0)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all active:scale-95"
            >
              <span>Приступить к тестированию</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active question or submission screen
  const isSelected = (value: number) =>
    currentQuestion && answers[currentQuestion.id] === value;

  const isCurrentAnswered =
    currentQuestion && answers[currentQuestion.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-12">
      {/* Top Header / Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.05]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentIndex === 0 ? 'К описанию' : 'Назад'}</span>
          </button>

          <div className="text-right">
            <span className="text-xs font-medium text-slate-300">
              Вопрос {currentIndex + 1}{' '}
              <span className="text-slate-400">из {totalQuestions}</span>
            </span>
            <span className="text-[11px] text-purple-400 ml-2 font-mono">
              ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Rainbow Progress Bar */}
        <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="h-full gemini-rainbow-bar transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="glass-card gemini-rainbow-border rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative">
          {/* Question Text (hidden for BDI-2 so only question statements are shown) */}
          {test.id !== 'bdi-2' && (
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 sm:mb-8 leading-snug">
              {currentQuestion.text}
            </h2>
          )}

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, optIdx) => {
              const selected = isSelected(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() =>
                    handleSelectOption(currentQuestion.id, option.value)
                  }
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl transition-all duration-200 flex items-start gap-3.5 border relative group ${
                    selected
                      ? 'bg-purple-500/15 border-purple-500/60 shadow-[0_0_20px_rgba(139,92,246,0.2)] text-white'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] hover:border-white/[0.2] text-slate-200'
                  }`}
                >
                  {/* Shortcut key indicator */}
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-mono font-semibold flex items-center justify-center shrink-0 transition-colors ${
                      selected
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/[0.06] text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {optIdx + 1}
                  </span>

                  <span className="text-sm sm:text-base leading-relaxed flex-1">
                    {option.label}
                  </span>

                  {selected && (
                    <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 animate-in fade-in zoom-in-75 duration-200" />
                  )}
                </button>
              );
            })}
          </div>

          {submitError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Подсказка: нажимайте клавиши 1-{currentQuestion.options.length} на клавиатуре
            </span>

            <div className="flex items-center gap-3 ml-auto">
              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentAnswered}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isCurrentAnswered
                      ? 'bg-white/[0.1] hover:bg-white/[0.18] text-white border border-white/[0.15]'
                      : 'bg-white/[0.02] text-slate-500 border border-white/[0.04] cursor-not-allowed'
                  }`}
                >
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isCurrentAnswered}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Подсчет результатов...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Завершить тест</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
