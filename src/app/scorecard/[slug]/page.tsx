// Server page wrapper
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { leaders } from "@/lib/data";
import { ScorecardCanvas } from "@/components/scorecard-canvas";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DonationSection } from "@/components/donation-section";

export function generateStaticParams() {
  return leaders.map((l) => ({ slug: l.slug }));
}

export default async function ScorecardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <div className="-mt-16">
        <Suspense fallback={<div className="mx-auto max-w-lg px-6 py-14" />}>
          <ScorecardCanvas leader={leader} />
        </Suspense>
      </div>
      <DonationSection />
      <SiteFooter />
    </div>
  );
}
