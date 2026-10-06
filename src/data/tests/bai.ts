import { TestDefinition, ScoreRange } from '@/types/test';

const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 21,
    label: 'Незначительный уровень тревоги (норма)',
    level: 'normal',
    color: '#10b981',
    description:
      'Уровень тревожности находится в пределах естественной нормы. Физиологические и эмоциональные проявления стресса незначительны.',
  },
  {
    min: 22,
    max: 35,
    label: 'Средняя (умеренная) тревожность',
    level: 'moderate',
    color: '#f59e0b',
    description:
      'Повышенный уровень тревожности. Могут периодически наблюдаться вегетативные реакции и внутреннее напряжение. Рекомендуется консультация специалиста.',
  },
  {
    min: 36,
    max: 63,
    label: 'Очень высокая тревога',
    level: 'severe',
    color: '#ef4444',
    description:
      'Клинически выраженный высокий уровень тревоги. Рекомендуется консультация психолога или врача-психотерапевта.',
  },
];

// Официальные варианты ответа по стандартизированному бланку Н.В. Тарабриной
const officialBaiOptions = [
  { label: 'Совсем не беспокоил', value: 0 },
  { label: 'Слегка. Не слишком меня беспокоил', value: 1 },
  { label: 'Умеренно. Это было неприятно, но я мог это переносить', value: 2 },
  { label: 'Очень сильно. Я с трудом мог это выносить', value: 3 },
];

export const baiTest: TestDefinition = {
  id: 'bai',
  title: 'Шкала тревоги Бека (BAI)',
  shortTitle: 'Тревожность Бека',
  subtitle: 'Beck Anxiety Inventory (адаптация Н.В. Тарабриной)',
  description:
    'Оценка уровня эмоциональной и соматической тревожности на основе официальной стандартизированной русскоязычной адаптации.',
  durationMinutes: 5,
  questionsCount: 21,
  badge: 'Клинический',
  instructions:
    'Данный список содержит наиболее распространенные симптомы тревоги. Тщательно изучите каждый пункт. Отметьте, насколько вас беспокоил каждый из этих симптомов в течение ПОСЛЕДНЕЙ НЕДЕЛИ, включая сегодняшний день.',
  scoreRanges,
  questions: [
    { id: 1, text: 'Ощущение онемения или покалывания в теле', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 2, text: 'Ощущение жары', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 3, text: 'Дрожь в ногах', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 4, text: 'Неспособность расслабиться', subscale: 'Когнитивная', options: officialBaiOptions },
    { id: 5, text: 'Страх, что произойдет самое плохое', subscale: 'Когнитивная', options: officialBaiOptions },
    { id: 6, text: 'Головокружение или ощущение легкости в голове', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 7, text: 'Ускоренное сердцебиение', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 8, text: 'Неустойчивость', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 9, text: 'Ощущение ужаса', subscale: 'Когнитивная', isCritical: true, criticalThreshold: 3, criticalAlertMessage: 'Критический маркер: максимальная интенсивность приступов ужаса.', options: officialBaiOptions },
    { id: 10, text: 'Нервозность', subscale: 'Когнитивная', options: officialBaiOptions },
    { id: 11, text: 'Дрожь в руках', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 12, text: 'Ощущение удушья', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 13, text: 'Шаткость походки', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 14, text: 'Страх утраты контроля', subscale: 'Когнитивная', options: officialBaiOptions },
    { id: 15, text: 'Затрудненность дыхания', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 16, text: 'Страх смерти', subscale: 'Когнитивная', isCritical: true, criticalThreshold: 3, criticalAlertMessage: 'Критический маркер: выраженный танатофобический страх смерти.', options: officialBaiOptions },
    { id: 17, text: 'Испуг', subscale: 'Когнитивная', options: officialBaiOptions },
    { id: 18, text: 'Желудочно-кишечные расстройства', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 19, text: 'Обмороки', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 20, text: 'Приливы крови к лицу', subscale: 'Соматическая', options: officialBaiOptions },
    { id: 21, text: 'Усиление потоотделения (не связанное с жарой)', subscale: 'Соматическая', options: officialBaiOptions },
  ],
  calculateResult: (answers) => {
    let totalScore = 0;
    let somaticScore = 0;
    let cognitiveScore = 0;
    const criticalFlags: string[] = [];

    baiTest.questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      totalScore += val;
      if (q.subscale === 'Соматическая') {
        somaticScore += val;
      } else {
        cognitiveScore += val;
      }

      if (q.isCritical && val >= (q.criticalThreshold ?? 3)) {
        criticalFlags.push(
          q.criticalAlertMessage ||
            `Высокий балл по симптому «${q.text}» (${val} из 3).`
        );
      }
    });

    const range =
      scoreRanges.find((r) => totalScore >= r.min && totalScore <= r.max) ||
      scoreRanges[scoreRanges.length - 1];

    return {
      totalScore,
      maxPossibleScore: 63,
      range,
      subscaleScores: [
        {
          key: 'somatic',
          title: 'Соматические проявления тревоги (14 симптомов)',
          score: somaticScore,
          maxScore: 42,
          color: '#06b6d4',
        },
        {
          key: 'cognitive',
          title: 'Субъективно-когнитивная тревога (7 симптомов)',
          score: cognitiveScore,
          maxScore: 21,
          color: '#ec4899',
        },
      ],
      criticalFlags,
    };
  },
};
