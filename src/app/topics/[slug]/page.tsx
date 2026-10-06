import { notFound } from "next/navigation";
import { getTopic, getTopicSlugs } from "@/content";
import { TopicView } from "@/components/TopicView";

export function generateStaticParams() {
  return getTopicSlugs().map((slug) => ({ slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <TopicView topic={topic} />;
}
