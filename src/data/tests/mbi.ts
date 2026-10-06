import { TestDefinition, ScoreRange } from '@/types/test';

// Официальная частотная шкала методики Н.Е. Водопьяновой, Е.С. Старченковой
const frequencyOptions = [
  { label: 'Никогда', value: 0 },
  { label: 'Очень редко', value: 1 },
  { label: 'Редко', value: 2 },
  { label: 'Иногда', value: 3 },
  { label: 'Часто', value: 4 },
  { label: 'Очень часто', value: 5 },
  { label: 'Каждый день', value: 6 },
];

const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 1,
    label: 'Сбалансированное состояние (низкий риск выгорания)',
    level: 'normal',
    color: '#10b981',
    description:
      'Показатели выгорания находятся в пределах нормы. Сохраняются высокий рабочий тонус, эмоциональная вовлеченность и удовлетворенность профессиональной деятельностью.',
  },
  {
    min: 2,
    max: 2,
    label: 'Начальная стадия выгорания (умеренный риск)',
    level: 'moderate',
    color: '#f59e0b',
    description:
      'Наблюдаются признаки накапливающейся усталости или дистанцированности. Рекомендуется пересмотреть рабочий график, восстановить баланс работы и личной жизни.',
  },
  {
    min: 3,
    max: 3,
    label: 'Выраженное профессиональное выгорание (высокий риск)',
    level: 'severe',
    color: '#ef4444',
    description:
      'Выраженное истощение психоэмоциональных ресурсов в сочетании с отстраненностью или обесцениванием своих результатов. Рекомендуется консультация психолога.',
  },
];

export const mbiTest: TestDefinition = {
  id: 'mbi',
  title: 'Опросник профессионального выгорания Маслач (MBI)',
  shortTitle: 'Выгорание (MBI)',
  subtitle: 'Maslach Burnout Inventory (адаптация Н.Е. Водопьяновой, Е.С. Старченковой)',
  description:
    'Диагностика уровня профессионального и эмоционального выгорания на основе официальной стандартизированной русскоязычной адаптации.',
  durationMinutes: 8,
  questionsCount: 22,
  badge: 'Профессиональный',
  instructions:
    'Вам предлагается 22 утверждения о чувствах и переживаниях, связанных с работой. Внимательно прочитайте каждое утверждение и отметьте, как часто вы ощущаете каждое из этих состояний.',
  scoreRanges,
  questions: [
    { id: 1, text: 'Я чувствую себя эмоционально опустошенным.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 2, text: 'После работы я чувствую себя как «выжатый лимон».', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 3, text: 'Утром я чувствую усталость и нежелание идти на работу.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 4, text: 'Я хорошо понимаю, что чувствуют мои подчиненные и коллеги, и стараюсь учитывать это в интересах дела.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 5, text: 'Я чувствую, что общаюсь с некоторыми подчиненными и коллегами как с предметами (без теплоты и расположения к ним).', subscale: 'Деперсонализация', options: frequencyOptions },
    { id: 6, text: 'После работы на некоторое время хочется уединиться от всех и всего.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 7, text: 'Я умею находить правильное решение в конфликтных ситуациях, возникающих при общении с коллегами.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 8, text: 'Я чувствую угнетенность и апатию.', subscale: 'Эмоциональное истощение', isCritical: true, criticalThreshold: 5, criticalAlertMessage: 'Критический маркер: частое состояние угнетенности и апатии.', options: frequencyOptions },
    { id: 9, text: 'Я уверен, что моя работа нужна людям.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 10, text: 'В последнее время я стал более «черствым» по отношению к тем, с кем работаю.', subscale: 'Деперсонализация', options: frequencyOptions },
    { id: 11, text: 'Я замечаю, что моя работа ожесточает меня.', subscale: 'Деперсонализация', options: frequencyOptions },
    { id: 12, text: 'У меня много планов на будущее, и я верю в их осуществление.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 13, text: 'Моя работа все больше меня разочаровывает.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 14, text: 'Мне кажется, что я слишком много работаю.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 15, text: 'Бывает, что мне действительно безразлично то, что происходит с некоторыми моими подчиненными и коллегами.', subscale: 'Деперсонализация', options: frequencyOptions },
    { id: 16, text: 'Мне хочется уединиться и отдохнуть от всего и всех.', subscale: 'Эмоциональное истощение', options: frequencyOptions },
    { id: 17, text: 'Я легко могу создать атмосферу доброжелательности и сотрудничества в коллективе.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 18, text: 'Во время работы я чувствую приятное оживление.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 19, text: 'Благодаря своей работе я уже сделал в жизни много действительно ценного.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 20, text: 'Я чувствую равнодушие и потерю интереса ко многому, что радовало меня в моей работе.', subscale: 'Эмоциональное истощение', isCritical: true, criticalThreshold: 5, criticalAlertMessage: 'Критический маркер: выраженная потеря профессионального интереса.', options: frequencyOptions },
    { id: 21, text: 'На работе я спокойно справляюсь с эмоциональными проблемами.', subscale: 'Редукция личных достижений', options: frequencyOptions },
    { id: 22, text: 'В последнее время мне кажется, что коллеги и подчиненные все чаще перекладывают на меня груз своих проблем и обязанностей.', subscale: 'Деперсонализация', options: frequencyOptions },
  ],
  calculateResult: (answers) => {
    let exhaustion = 0;
    let depersonalization = 0;
    let accomplishment = 0;
    const criticalFlags: string[] = [];

    // Официальные ключи Водопьяновой:
    // Эмоциональное истощение: 1, 2, 3, 6, 8, 13, 14, 16, 20
    // Деперсонализация: 5, 10, 11, 15, 22
    // Редукция достижений: 4, 7, 9, 12, 17, 18, 19, 21
    const exhaustionIds = [1, 2, 3, 6, 8, 13, 14, 16, 20];
    const depersonalizationIds = [5, 10, 11, 15, 22];
    const accomplishmentIds = [4, 7, 9, 12, 17, 18, 19, 21];

    mbiTest.questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      if (exhaustionIds.includes(q.id)) exhaustion += val;
      if (depersonalizationIds.includes(q.id)) depersonalization += val;
      if (accomplishmentIds.includes(q.id)) accomplishment += val;

      if (q.isCritical && val >= (q.criticalThreshold ?? 5)) {
        criticalFlags.push(
          q.criticalAlertMessage ||
            `Высокая выраженность по симптому «${q.text}» (${val} из 6).`
        );
      }
    });

    // Оценка уровней выгорания по стандартам Водопьяновой:
    // ЭИ (макс 54): 0-15 низкий, 16-24 средний, 25+ высокий
    // ДП (макс 30): 0-5 низкий, 6-10 средний, 11+ высокий
    // РЛД (макс 48): 37+ высокая успешность, 31-36 средняя, <=30 выраженная редукция
    const isExhaustionHigh = exhaustion >= 25;
    const isDepersonalizationHigh = depersonalization >= 11;
    const isAccomplishmentLow = accomplishment <= 30;

    let burnoutPoints = 0;
    if (isExhaustionHigh) burnoutPoints++;
    if (isDepersonalizationHigh) burnoutPoints++;
    if (isAccomplishmentLow) burnoutPoints++;

    let levelIndex = 0;
    if (burnoutPoints === 1 || exhaustion >= 16 || depersonalization >= 6) {
      levelIndex = 1;
    }
    if (burnoutPoints >= 2 || (isExhaustionHigh && isDepersonalizationHigh)) {
      levelIndex = 2;
    }

    const range = scoreRanges[levelIndex];

    return {
      totalScore: exhaustion + depersonalization + (48 - accomplishment),
      maxPossibleScore: 132,
      range,
      subscaleScores: [
        {
          key: 'exhaustion',
          title: 'Эмоциональное истощение (9 пунктов)',
          score: exhaustion,
          maxScore: 54,
          levelLabel: exhaustion >= 25 ? 'Высокий уровень' : exhaustion >= 16 ? 'Средний уровень' : 'Низкий уровень',
          color: exhaustion >= 25 ? '#ef4444' : exhaustion >= 16 ? '#f59e0b' : '#10b981',
        },
        {
          key: 'depersonalization',
          title: 'Деперсонализация / цинизм (5 пунктов)',
          score: depersonalization,
          maxScore: 30,
          levelLabel: depersonalization >= 11 ? 'Высокий уровень' : depersonalization >= 6 ? 'Средний уровень' : 'Низкий уровень',
          color: depersonalization >= 11 ? '#ef4444' : depersonalization >= 6 ? '#f59e0b' : '#10b981',
        },
        {
          key: 'accomplishment',
          title: 'Редукция личных достижений (8 пунктов)',
          score: accomplishment,
          maxScore: 48,
          levelLabel: accomplishment >= 37 ? 'Высокая успешность' : accomplishment >= 31 ? 'Средний уровень' : 'Выраженная редукция (спад)',
          color: accomplishment <= 30 ? '#ef4444' : accomplishment <= 36 ? '#f59e0b' : '#10b981',
        },
      ],
      criticalFlags,
    };
  },
};
