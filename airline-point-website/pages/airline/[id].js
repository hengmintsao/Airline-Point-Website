import { useRouter } from "next/router";
import AirlineCardDetail from "@/components/AirlineCardDetail";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-07 Description: About.js can view card list, CardDetail basic feature complete. #TO-DO: Might need to consider storage folder and names might too similar to another folder
2. Date: 2025-Feb-03 Description: Remove redundant codes, test complete. #TO-DO: None


=====================================================================================================================================================
*/


// This [id].js is for dynamically rendering pages based on the route parameter "id".
export default function AirlineDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return <AirlineCardDetail id={id} />;
}
