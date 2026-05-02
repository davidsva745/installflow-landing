import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("installflow_session")?.value;

  if (session !== "demo-session") {
    redirect("/login");
  }

  return (
    <DashboardClient
      ghlConfigured={Boolean(process.env.GHL_PRIVATE_INTEGRATION_TOKEN)}
    />
  );
}
