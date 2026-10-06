import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldCheck,
  Lock,
  Clock,
  Trash2,
  AlertCircle,
  ArrowLeft,
  FileCheck2,
  Sparkles,
  Server,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Конфиденциальность и безопасность данных | ПсихоТест',
  description:
    'Политика конфиденциальности, принципы анонимности и правила хранения данных в соответствии с 152-ФЗ.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>На главную</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Privacy by Design & 152-ФЗ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Конфиденциальность и хранение данных
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Как мы защищаем вашу приватность, почему сервис не собирает персональные данные и на каких принципах организовано безопасное хранение результатов.
        </p>
      </div>

      {/* Main Sections Grid */}
      <div className="space-y-6">
        {/* Section 1: Полная анонимность */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                1. Полная анонимность без сбора персональных данных
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                В соответствии со статьей 3 Федерального закона № 152-ФЗ «О персональных данных», персональными данными признается информация, прямо или косвенно относящаяся к определенному физическому лицу.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-slate-300 space-y-1.5">
                <p className="font-semibold text-emerald-400">Наш сервис принципиально не запрашивает и не сохраняет:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Фамилию, имя или отчество</li>
                  <li>Номера телефонов, адрес электронной почты или профили в социальных сетях</li>
                  <li>Учетные записи, пароли или авторизационные файлы cookies</li>
                  <li>Паспортные или любые другие государственные идентификаторы</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Обезличенные токены */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                2. Обезличенная модель хранения (UUID)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Каждый завершенный тест связывается исключительно со случайно сгенерированным криптографическим токеном формата <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-purple-300 font-mono text-xs">UUIDv4</code>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Для базы данных и администраторов сервиса ответы и баллы представляют собой изолированный набор числовых значений без какой-либо связи с личностью. Технически и юридически эти данные являются полностью обезличенными.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Срок хранения 30 дней и удаление */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                3. Срок хранения 30 дней и автоматическое уничтожение
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Согласно части 7 статьи 5 № 152-ФЗ, хранение данных должно осуществляться не дольше, чем этого требуют цели обработки, после чего данные подлежат уничтожению:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong>Цель хранения:</strong> обеспечение достаточного временного окна (30 дней), чтобы клиент мог передать ссылку своему специалисту и разобрать результаты на консультации.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong>Автоматическая очистка:</strong> ровно через 30 суток с момента прохождения теста запись автоматически и безвозвратно удаляется сервером.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>
                    <strong>Мгновенное удаление:</strong> вы или ваш психолог можете в любой момент досрочно стереть запись по кнопке <em>«Удалить сейчас»</em> на странице результатов или отчета.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Передача психологу */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                4. Контроль доступа к отчету
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">
                Доступ к развернутому отчету осуществляется исключительно по уникальной секретной ссылке с токеном.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Вы самостоятельно принимаете решение о том, кому и через какие каналы связи (личные сообщения, мессенджер) передавать эту ссылку. Сервис не рассылает результаты автоматически и не передает их третьим лицам.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Немедицинский статус */}
        <div className="p-6 sm:p-7 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-slate-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-200 text-sm mb-1">
                Отказ от медицинских претензий (№ 323-ФЗ)
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                Сервис носит информационно-психометрический и ориентировочный характер. Результаты тестов не являются официальным медицинским диагнозом, не заменяют очную консультацию врача-психотерапевта или психиатра и не могут служить основанием для самостоятельного назначения лекарственных средств.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back button bottom */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-sm font-medium text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к каталогу тестов</span>
        </Link>
      </div>
    </div>
  );
}
