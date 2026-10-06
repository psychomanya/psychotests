import React from 'react';

interface BrainLogoProps {
  className?: string;
}

/**
 * Векторный логотип: анатомический контур мозга в профиль (вид сбоку)
 * Точно соответствует пропорциям референса:
 * - Выраженная лобная доля (слева);
 * - Теменная и затылочная доли (сверху и справа);
 * - Выступающая височная доля под латеральной (Сильвиевой) бороздой;
 * - Мозжечок под затылочной долей с характерными параллельными бороздками;
 * - Ствол мозга, уходящий книзу;
 * - Тонкие радужные контуры в стиле Gemini Aura со свечением.
 */
export default function BrainLogo({ className = 'w-9 h-9' }: BrainLogoProps) {
  return (
    <div
      className={`relative ${className} rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.1] shadow-[0_0_15px_rgba(155,81,224,0.25)] flex items-center justify-center group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(155,81,224,0.4)] transition-all shrink-0`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
        style={{
          filter: 'drop-shadow(0px 0px 4px rgba(168, 85, 247, 0.45))',
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="gemini-brain-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="35%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* 1. Верхний и боковой контур коры (лобная -> теменная -> затылочная доля) */}
        <path
          d="M 3.8 11.5
             C 3.2 11.0 2.6 9.8 2.3 8.8
             C 2.0 7.6 2.3 6.4 3.1 5.4
             C 4.0 4.2 5.4 3.3 6.8 2.6
             C 8.5 1.8 10.4 1.6 12.3 1.8
             C 14.4 2.0 16.5 2.7 18.2 4.0
             C 19.8 5.2 21.0 6.8 21.8 8.6
             C 22.4 10.0 22.4 11.6 22.1 13.0
             C 21.7 14.4 20.8 15.6 19.6 16.2"
          stroke="url(#gemini-brain-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 2. Височная доля (выступающий язычок вперед-влево под сильвиевой бороздой) */}
        <path
          d="M 3.8 11.5
             C 4.6 12.0 6.0 12.2 7.2 12.4
             C 6.8 13.1 6.8 13.9 7.2 14.6
             C 7.6 15.4 8.6 16.0 9.8 16.2
             C 11.2 16.3 12.6 15.9 13.6 15.0
             C 14.2 15.6 14.6 16.5 14.7 17.5"
          stroke="url(#gemini-brain-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Сильвиева (латеральная) борозда */}
        <path
          d="M 4.2 11.6
             C 6.2 11.4 8.5 11.8 10.5 11.2
             C 12.2 10.7 13.8 11.2 15.2 12.2"
          stroke="url(#gemini-brain-gradient)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* 4. Мозжечок (нижне-задняя часть с характерной штриховкой как на референсе) */}
        <path
          d="M 19.6 16.2
             C 20.8 16.6 21.2 17.8 20.4 18.8
             C 19.4 19.8 17.6 20.2 16.2 19.6
             C 15.2 19.1 14.6 18.2 14.7 17.5"
          stroke="url(#gemini-brain-gradient)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Горизонтальные полоски мозжечка */}
        <path d="M 16.8 17.0 C 18.2 17.3 19.6 17.1 20.4 17.4" stroke="url(#gemini-brain-gradient)" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M 15.8 18.0 C 17.2 18.2 18.6 18.0 19.8 18.4" stroke="url(#gemini-brain-gradient)" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M 15.2 19.0 C 16.4 19.2 17.6 19.0 18.8 19.3" stroke="url(#gemini-brain-gradient)" strokeWidth="0.85" strokeLinecap="round" />

        {/* 5. Ствол мозга (вертикальный стебель вниз) */}
        <path
          d="M 13.8 17.8
             C 14.0 19.2 14.3 20.8 14.5 22.3
             C 15.1 22.5 15.8 22.5 16.2 22.1
             C 16.0 20.8 15.6 19.5 15.3 18.8"
          stroke="url(#gemini-brain-gradient)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Продольное волокно ствола */}
        <path d="M 14.8 18.8 L 15.3 22.2" stroke="url(#gemini-brain-gradient)" strokeWidth="0.8" strokeLinecap="round" />

        {/* 6. Характерные извилины лобной доли (как в референсе) */}
        <path d="M 4.2 7.0 C 5.8 6.5 7.4 7.2 6.8 8.8 C 6.4 9.8 7.5 10.6 8.4 9.8" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 7.8 4.2 C 9.0 5.2 8.8 6.8 10.0 7.8" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" strokeLinecap="round" />

        {/* 7. Извилины теменной доли */}
        <path d="M 11.2 2.6 C 11.0 4.8 11.8 6.5 10.8 8.4" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" stroke-linecap="round" />
        <path d="M 14.0 3.2 C 13.8 5.4 14.8 6.8 14.2 9.0" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" stroke-linecap="round" />

        {/* 8. Извилины затылочной доли */}
        <path d="M 17.2 4.2 C 16.8 6.4 18.0 7.6 17.4 9.6 C 16.8 11.2 18.0 12.5 19.2 13.0" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" stroke-linecap="round" />
        <path d="M 19.2 8.2 C 20.0 9.8 19.4 11.5 20.5 12.8" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" stroke-linecap="round" />

        {/* 9. Извилина височной доли */}
        <path d="M 7.6 13.8 C 9.2 13.5 10.8 14.0 12.0 13.2" stroke="url(#gemini-brain-gradient)" strokeWidth="0.9" stroke-linecap="round" />
      </svg>
    </div>
  );
}
