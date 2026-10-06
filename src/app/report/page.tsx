'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SavedSubmission } from '@/types/test';
import PsychologistReportView from '@/components/PsychologistReportView';
import {
  buildSubmissionFromAnswers,
  decodePayload,
  getFromLocalStorage,
} from '@/lib/submissionHelper';
import { ArrowLeft, AlertCircle } from 'lucide-react';

function ReportContent() {
  const searchParams = useSearchParams();
  const [submission, setSubmission] = useState<SavedSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = searchParams.get('token');
    let d = searchParams.get('d');

    // Also support hash fallback: #d=... or #token=...
    if (!token && !d && typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      token = params.get('token');
      d = params.get('d') || (hash.startsWith('d=') ? hash.substring(2) : (!token ? hash : null));
    }

    if (d) {
      const decoded = decodePayload(d);
      if (decoded) {
        const built = buildSubmissionFromAnswers(
          decoded.t,
          decoded.a,
          decoded.k,
          decoded.c
        );
        if (built) {
          setSubmission(built.submission);
          setLoading(false);
          return;
        }
      }
    }

    if (token) {
      const local = getFromLocalStorage(token);
      if (local) {
        setSubmission(local);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Загрузка клинического отчета...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="glass-card rounded-3xl p-8 border border-white/[0.08]">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Отчет не найден
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Ссылка недействительна, срок хранения истек или сессия была удалена клиентом.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На главную страницу</span>
          </Link>
        </div>
      </div>
    );
  }

  return <PsychologistReportView submission={submission} />;
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-400 text-sm">Загрузка клинического отчета...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
