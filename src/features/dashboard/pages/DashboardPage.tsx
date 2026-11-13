import { LayoutDashboard } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageContainer, PageHeader } from "@/components/common/Page";

// Same greeting rule as the old Seiyone dashboard.
function greetingFor(hour: number): string {
  if (hour < 12) return "Good morning.";
  if (hour < 17) return "Good afternoon.";
  return "Good evening.";
}

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader title={greetingFor(new Date().getHours())} description="Here is your operational overview." />
      <EmptyState
        icon={LayoutDashboard}
        title="No dashboard data yet"
        description="Dashboard summaries will appear here once the dashboard is connected to the Seiyone backend."
      />
    </PageContainer>
  );
}
