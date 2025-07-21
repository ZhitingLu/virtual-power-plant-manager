// apps/web/app/plants/page.tsx
import { fetchPlants } from "@/utils/api";
import ReadingForm from "@/components/ReadingForm";
import Sidebar from "@/components/Sidebar";
import PlantsGrid from "@/components/PlantsGrid";

export const metadata = {
  title: "Virtual Power Plant Manager - Plants",
  description: "View and manage your virtual power plants",
};

export default async function PlantsPage() {
  const plants = await fetchPlants();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      <Sidebar>
        <PlantsGrid plants={plants} />
      </Sidebar>

    </main>
  );
}
