export interface PowerPlant {
    id: string;
    name: string;
    location: string;
    capacity: number;
}
export interface PowerReading {
    plantId: string;
    timestamp: Date;
    powerOutput: number;
    efficiency?: number;
}
