import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getDashboardData } from "../../lib/ghl";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("installflow_session")?.value;

  if (session !== "demo-session") {
    redirect("/login");
  }

  const dashboardData = await getDashboardData();

  return <DashboardClient data={dashboardData} />;
}
