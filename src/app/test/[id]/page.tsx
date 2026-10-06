import { notFound } from 'next/navigation';
import { getTestById, allTests } from '@/data/tests';
import TestRunner from '@/components/TestRunner';

export function generateStaticParams() {
  return allTests.map((t) => ({ id: t.id }));
}

interface TestPageProps {
  params: Promise<{ id: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { id } = await params;
  const test = getTestById(id);

  if (!test) {
    notFound();
  }

  // Strip non-serializable functions before passing across the RSC boundary to Client Component
  const { calculateResult, ...serializableTest } = test;

  return <TestRunner test={serializableTest} />;
}
