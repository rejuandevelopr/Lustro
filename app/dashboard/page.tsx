import Dashboard from "@/components/dashboard/Dashboard";

// Protected route. In production this is the Clerk auth boundary:
//   const { userId } = await auth(); if (!userId) redirect("/sign-in");
// The shop is resolved from the signed-in user's organization (Clerk org → Convex shopId).
export default function DashboardPage() {
  return <Dashboard />;
}
