import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation"


const TrackPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

if (!isLoggedIn) {redirect('/api/auth/login?')}
  return <div>TrackPage</div>;
};

export default TrackPage;
