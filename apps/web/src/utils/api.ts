import { PowerPlant, PowerReading } from "@vpp/types"; // We'll need to share types somehow (we'll fix this)

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPlants(): Promise<PowerPlant[]> {
  const res = await fetch(`${API_BASE}/plants`);
  if (!res.ok) throw new Error("Failed to fetch plants");
  return res.json();
}

export async function fetchReadings(plantId: string): Promise<PowerReading[]> {
  const res = await fetch(`${API_BASE}/plants/${plantId}/readings`);
  if (!res.ok) throw new Error("Failed to fetch readings");
  return res.json();
}

export async function postReading(reading: PowerReading): Promise<void> {
  const res = await fetch(`${API_BASE}/plants/reading`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reading),
  });
  if (!res.ok) throw new Error("Failed to post reading");
}
