import { useRouter } from "next/router";
import AirlineCardDetail from "@/components/AirlineCardDetail";

export default function AirlineDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return <AirlineCardDetail id={id} />;
}
