import { notFound } from 'next/navigation';
import { getSubmission } from '@/lib/db';
import PsychologistReportView from '@/components/PsychologistReportView';

interface ReportPageProps {
  params: Promise<{ token: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { token } = await params;
  const submission = getSubmission(token);

  if (!submission) {
    notFound();
  }

  return <PsychologistReportView submission={submission} />;
}
