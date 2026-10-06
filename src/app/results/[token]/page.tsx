import { notFound } from 'next/navigation';
import { getSubmission } from '@/lib/db';
import ClientResultsView from '@/components/ClientResultsView';

interface ResultsPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { token } = await params;
  const submission = getSubmission(token);

  if (!submission) {
    notFound();
  }

  return <ClientResultsView submission={submission} />;
}
