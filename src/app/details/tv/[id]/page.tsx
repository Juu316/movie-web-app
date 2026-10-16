import { notFound } from "next/navigation";
import MediaDetailsView, { detailsMetadata } from "@/components/MediaDetailsView";
import { getDetails } from "@/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  return detailsMetadata(await getDetails("tv", (await params).id));
}

export default async function Page({ params }: Props) {
  const data = await getDetails("tv", (await params).id);
  if (!data) notFound();
  return <MediaDetailsView data={data} />;
}
