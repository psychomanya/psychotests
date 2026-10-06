import { TestDefinition, ScoreRange } from '@/types/test';

const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 14,
    label: 'Норма (отсутствие симптомов)',
    level: 'normal',
    color: '#10b981',
    description:
      'Показатели по шкалам тревоги и депрессии находятся в пределах нормы (0–7 баллов). Признаков клинически или субклинически выраженного эмоционального расстройства не выявлено.',
  },
  {
    min: 15,
    max: 21,
    label: 'Субклинический уровень тревоги / депрессии',
    level: 'moderate',
    color: '#f59e0b',
    description:
      'Выявлена субклиническая выраженность симптоматики (8–10 баллов по одной или обеим шкалам). Рекомендуется обратить внимание на психоэмоциональное состояние, режим отдыха и при необходимости проконсультироваться со специалистом.',
  },
  {
    min: 22,
    max: 42,
    label: 'Клинически выраженная тревога / депрессия',
    level: 'severe',
    color: '#ef4444',
    description:
      'Показатели соответствуют клинически выраженным симптомам тревоги и/или депрессии (11+ баллов). Рекомендуется консультация психолога, врача-психотерапевта или психиатра.',
  },
];

export const hadsTest: TestDefinition = {
  id: 'hads',
  title: 'Госпитальная шкала тревоги и депрессии (HADS)',
  shortTitle: 'Тревога и депрессия (HADS)',
  subtitle: 'Hospital Anxiety and Depression Scale (адаптация М.Ю. Дробижева)',
  description:
    'Клинический экспресс-скрининг для дифференцированной оценки симптомов тревоги и депрессии.',
  durationMinutes: 4,
  questionsCount: 14,
  badge: 'Клинический',
  instructions:
    'Каждому утверждению соответствуют 4 варианта ответа. Выберите тот вариант, который наилучшим образом отражает ваше состояние за ПОСЛЕДНЮЮ НЕДЕЛЮ. Не раздумывайте слишком долго над каждым вопросом — ваша первая естественная реакция обычно наиболее точна.',
  scoreRanges,
  questions: [
    {
      id: 1,
      text: 'Я испытываю напряженность, мне не по себе.',
      subscale: 'Тревога (HADS-A)',
      options: [
        { label: 'Всё время', value: 3 },
        { label: 'Часто', value: 2 },
        { label: 'Время от времени, иногда', value: 1 },
        { label: 'Совсем не испытываю', value: 0 },
      ],
    },
    {
      id: 2,
      text: 'То, что приносило мне большое удовольствие, и сейчас вызывает у меня такое же чувство.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Определенно, это так', value: 0 },
        { label: 'Наверное, это так', value: 1 },
        { label: 'Лишь в очень малой степени это так', value: 2 },
        { label: 'Это совсем не так', value: 3 },
      ],
    },
    {
      id: 3,
      text: 'Я испытываю страх, кажется, будто что-то ужасное может вот-вот случиться.',
      subscale: 'Тревога (HADS-A)',
      isCritical: true,
      criticalThreshold: 3,
      criticalAlertMessage: 'Критический маркер: выраженный страх катастрофы.',
      options: [
        { label: 'Определенно, это так, и страх очень сильный', value: 3 },
        { label: 'Да, это так, но страх не очень сильный', value: 2 },
        { label: 'Иногда, но это меня не беспокоит', value: 1 },
        { label: 'Совсем не испытываю', value: 0 },
      ],
    },
    {
      id: 4,
      text: 'Я способен рассмеяться и увидеть в том или ином событии смешное.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Определенно, это так', value: 0 },
        { label: 'Наверное, это так', value: 1 },
        { label: 'Лишь в очень малой степени это так', value: 2 },
        { label: 'Это совсем не так', value: 3 },
      ],
    },
    {
      id: 5,
      text: 'Беспокойные мысли крутятся у меня в голове.',
      subscale: 'Тревога (HADS-A)',
      options: [
        { label: 'Постоянно', value: 3 },
        { label: 'Большую часть времени', value: 2 },
        { label: 'Время от времени и не так часто', value: 1 },
        { label: 'Только иногда', value: 0 },
      ],
    },
    {
      id: 6,
      text: 'Я испытываю бодрость.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Совсем не испытываю', value: 3 },
        { label: 'Очень редко', value: 2 },
        { label: 'Иногда', value: 1 },
        { label: 'Практически всё время', value: 0 },
      ],
    },
    {
      id: 7,
      text: 'Я легко могу сесть и расслабиться.',
      subscale: 'Тревога (HADS-A)',
      options: [
        { label: 'Определенно, это так', value: 0 },
        { label: 'Наверно, это так', value: 1 },
        { label: 'Лишь изредка это так', value: 2 },
        { label: 'Совсем не могу', value: 3 },
      ],
    },
    {
      id: 8,
      text: 'Мне кажется, что я всё стал делать очень медленно.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Практически всё время', value: 3 },
        { label: 'Часто', value: 2 },
        { label: 'Иногда', value: 1 },
        { label: 'Совсем нет', value: 0 },
      ],
    },
    {
      id: 9,
      text: 'Я испытываю внутреннее напряжение или дрожь.',
      subscale: 'Тревога (HADS-A)',
      options: [
        { label: 'Совсем не испытываю', value: 0 },
        { label: 'Иногда', value: 1 },
        { label: 'Часто', value: 2 },
        { label: 'Очень часто', value: 3 },
      ],
    },
    {
      id: 10,
      text: 'Я не слежу за своей внешностью.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Определенно, это так', value: 3 },
        { label: 'Я не уделяю этому столько времени, сколько нужно', value: 2 },
        { label: 'Может быть, я стал меньше уделять этому внимания', value: 1 },
        { label: 'Я слежу за собой так же, как и раньше', value: 0 },
      ],
    },
    {
      id: 11,
      text: 'Я испытываю неусидчивость, словно мне постоянно нужно двигаться.',
      subscale: 'Тревога (HADS-A)',
      options: [
        { label: 'Определенно, это так', value: 3 },
        { label: 'Наверное, это так', value: 2 },
        { label: 'Лишь в некоторой степени это так', value: 1 },
        { label: 'Совсем не испытываю', value: 0 },
      ],
    },
    {
      id: 12,
      text: 'Я считаю, что мои дела (занятия, увлечения) могут принести мне чувство удовлетворения.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Точно так же, как и обычно', value: 0 },
        { label: 'Да, но не в той степени, как раньше', value: 1 },
        { label: 'Значительно меньше, чем обычно', value: 2 },
        { label: 'Совсем так не считаю', value: 3 },
      ],
    },
    {
      id: 13,
      text: 'У меня бывает внезапное чувство паники.',
      subscale: 'Тревога (HADS-A)',
      isCritical: true,
      criticalThreshold: 3,
      criticalAlertMessage: 'Критический маркер: частые внезапные приступы паники.',
      options: [
        { label: 'Очень часто', value: 3 },
        { label: 'Довольно часто', value: 2 },
        { label: 'Не так уж часто', value: 1 },
        { label: 'Совсем не бывает', value: 0 },
      ],
    },
    {
      id: 14,
      text: 'Я могу получить удовольствие от хорошей книги, радио- или телепрограммы.',
      subscale: 'Депрессия (HADS-D)',
      options: [
        { label: 'Часто', value: 0 },
        { label: 'Иногда', value: 1 },
        { label: 'Редко', value: 2 },
        { label: 'Очень редко', value: 3 },
      ],
    },
  ],
  calculateResult: (answers) => {
    let anxietyScore = 0;
    let depressionScore = 0;
    const criticalFlags: string[] = [];

    const anxietyIds = [1, 3, 5, 7, 9, 11, 13];
    const depressionIds = [2, 4, 6, 8, 10, 12, 14];

    hadsTest.questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      if (anxietyIds.includes(q.id)) {
        anxietyScore += val;
      } else if (depressionIds.includes(q.id)) {
        depressionScore += val;
      }

      if (q.isCritical && val >= (q.criticalThreshold ?? 3)) {
        criticalFlags.push(
          q.criticalAlertMessage ||
            `Высокий балл по симптому «${q.text}» (${val} из 3).`
        );
      }
    });

    const totalScore = anxietyScore + depressionScore;

    // Интерпретация субшкал по стандарту Дробижева / Zigmond & Snaith:
    // 0–7: Норма (отсутствие достоверно выраженных симптомов)
    // 8–10: Субклинически выраженная тревога / депрессия
    // 11–21: Клинически выраженная тревога / депрессия
    const getSubscaleStatus = (score: number) => {
      if (score >= 11) {
        return {
          label: 'Клинически выраженная (11–21 балл)',
          color: '#ef4444',
          level: 'severe' as const,
        };
      }
      if (score >= 8) {
        return {
          label: 'Субклинически выраженная (8–10 баллов)',
          color: '#f59e0b',
          level: 'moderate' as const,
        };
      }
      return {
        label: 'Норма (0–7 баллов)',
        color: '#10b981',
        level: 'normal' as const,
      };
    };

    const anxietyStatus = getSubscaleStatus(anxietyScore);
    const depressionStatus = getSubscaleStatus(depressionScore);

    // Определение общей клинической категории:
    let level: 'normal' | 'moderate' | 'severe' = 'normal';
    let label = 'Норма (отсутствие выраженных симптомов)';
    let color = '#10b981';
    let description =
      'Показатели тревоги и депрессии находятся в пределах нормы (0–7 баллов). Признаков клинически или субклинически значимого эмоционального расстройства не выявлено.';

    if (anxietyStatus.level === 'severe' || depressionStatus.level === 'severe') {
      level = 'severe';
      color = '#ef4444';
      if (anxietyStatus.level === 'severe' && depressionStatus.level === 'severe') {
        label = 'Клинически выраженная тревога и депрессия';
        description = `Клинически выраженный уровень как по шкале тревоги (${anxietyScore} из 21), так и по шкале депрессии (${depressionScore} из 21). Рекомендуется консультация психолога или врача-психотерапевта.`;
      } else if (anxietyStatus.level === 'severe') {
        label =
          depressionStatus.level === 'moderate'
            ? 'Клиническая тревога и субклиническая депрессия'
            : 'Клинически выраженная тревога';
        description = `Клинически выраженный уровень тревоги (${anxietyScore} из 21)${
          depressionStatus.level === 'moderate'
            ? ` в сочетании с субклинической депрессией (${depressionScore} из 21)`
            : ''
        }. Рекомендуется консультация специалиста.`;
      } else {
        label =
          anxietyStatus.level === 'moderate'
            ? 'Клиническая депрессия и субклиническая тревога'
            : 'Клинически выраженная депрессия';
        description = `Клинически выраженный уровень депрессии (${depressionScore} из 21)${
          anxietyStatus.level === 'moderate'
            ? ` в сочетании с субклинической тревогой (${anxietyScore} из 21)`
            : ''
        }. Рекомендуется консультация специалиста.`;
      }
    } else if (anxietyStatus.level === 'moderate' || depressionStatus.level === 'moderate') {
      level = 'moderate';
      color = '#f59e0b';
      if (anxietyStatus.level === 'moderate' && depressionStatus.level === 'moderate') {
        label = 'Субклиническая тревога и депрессия';
        description = `Субклинический уровень по обеим шкалам (тревога: ${anxietyScore} из 21, депрессия: ${depressionScore} из 21). Симптомы могут свидетельствовать о психоэмоциональном перенапряжении или реакции на стресс.`;
      } else if (anxietyStatus.level === 'moderate') {
        label = 'Субклинически выраженная тревога';
        description = `Субклинический уровень тревоги (${anxietyScore} из 21) при нормальных показателях депрессии (${depressionScore} из 21).`;
      } else {
        label = 'Субклинически выраженная депрессия';
        description = `Субклинический уровень депрессии (${depressionScore} из 21) при нормальных показателях тревоги (${anxietyScore} из 21).`;
      }
    }

    const range: ScoreRange = {
      min: 0,
      max: 42,
      label,
      level,
      color,
      description,
    };

    return {
      totalScore,
      maxPossibleScore: 42,
      range,
      subscaleScores: [
        {
          key: 'anxiety',
          title: 'Шкала тревоги (HADS-A)',
          score: anxietyScore,
          maxScore: 21,
          levelLabel: anxietyStatus.label,
          color: anxietyStatus.color,
        },
        {
          key: 'depression',
          title: 'Шкала депрессии (HADS-D)',
          score: depressionScore,
          maxScore: 21,
          levelLabel: depressionStatus.label,
          color: depressionStatus.color,
        },
      ],
      criticalFlags,
    };
  },
};
