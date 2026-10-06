import { NextRequest, NextResponse } from 'next/server';
import { getTestById } from '@/data/tests';
import { saveSubmission, getSubmission, deleteSubmission } from '@/lib/db';
import { RawAnswerRecord, SavedSubmission } from '@/types/test';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testId, answers } = body as {
      testId: string;
      answers: Record<number, number>;
    };

    if (!testId || !answers) {
      return NextResponse.json(
        { error: 'Необходимо указать testId и ответы answers' },
        { status: 400 }
      );
    }

    const test = getTestById(testId);
    if (!test) {
      return NextResponse.json({ error: 'Тест не найден' }, { status: 404 });
    }

    const calculated = test.calculateResult(answers);

    // Build detailed raw answer records
    const rawAnswers: RawAnswerRecord[] = test.questions.map((q) => {
      const selectedValue = answers[q.id] ?? 0;
      const option = q.options.find((o) => o.value === selectedValue);
      const isCriticalHit =
        Boolean(q.isCritical) && selectedValue >= (q.criticalThreshold ?? 1);

      return {
        questionId: q.id,
        questionText: q.text,
        subscale: q.subscale,
        selectedLabel: option ? option.label : `Балл: ${selectedValue}`,
        score: selectedValue,
        isCritical: isCriticalHit,
        criticalAlertMessage: isCriticalHit ? q.criticalAlertMessage : undefined,
      };
    });

    const shareToken = crypto.randomUUID();
    const now = new Date();
    // 30 days expiration
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const submission: SavedSubmission = {
      shareToken,
      testId: test.id,
      testTitle: test.title,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      totalScore: calculated.totalScore,
      maxPossibleScore: calculated.maxPossibleScore,
      level: calculated.range.level,
      levelLabel: calculated.range.label,
      description: calculated.range.description,
      levelColor: calculated.range.color,
      subscaleScores: calculated.subscaleScores,
      criticalFlags: calculated.criticalFlags,
      rawAnswers,
    };

    saveSubmission(submission);

    return NextResponse.json({
      success: true,
      shareToken,
      submission,
    });
  } catch (error: any) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Ошибка сохранения результатов: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Параметр token обязателен' }, { status: 400 });
  }

  const submission = getSubmission(token);
  if (!submission) {
    return NextResponse.json(
      { error: 'Результаты теста не найдены или срок действия ссылки истек (30 дней).' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, submission });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Параметр token обязателен' }, { status: 400 });
  }

  const deleted = deleteSubmission(token);
  if (!deleted) {
    return NextResponse.json({ error: 'Запись не найдена' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Результаты успешно удалены' });
}
