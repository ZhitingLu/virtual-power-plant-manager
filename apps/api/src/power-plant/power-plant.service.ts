import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PowerPlant, PowerReading } from '@vpp/types';

@Injectable() // Decorator marks this as an injectable service
export class PowerPlantService {
  // In-memory storage for demo purposes (replace with DB in real app)
  private plants: PowerPlant[] = [
    {
      id: '1',
      name: 'Solar Farm Alpha',
      location: 'California',
      capacity: 100, // MW
    },
    {
      id: '2',
      name: 'Wind Park Beta',
      location: 'Texas',
      capacity: 150, // MW
    },
  ];

  private readings: PowerReading[] = [];

  constructor(private eventEmitter: EventEmitter2) {} // Inject event emitter

  async getPlants(): Promise<PowerPlant[]> {
    // In a real app, this would query a database
    return this.plants;
  }

  async processReading(reading: PowerReading): Promise<void> {
    // Validate the reading
    if (!this.plants.some(p => p.id === reading.plantId)) {
      throw new Error('Plant not found');
    }

    // Store the reading (in memory for now)
    this.readings.push(reading);

    // Calculate efficiency (simplified for demo)
    const plant = this.plants.find(p => p.id === reading.plantId)!;
    const efficiency = (reading.powerOutput / plant.capacity) * 100;
    
    // Create enhanced reading with efficiency
    const enhancedReading = {
      ...reading,
      efficiency: parseFloat(efficiency.toFixed(2)),
    };

    // Emit an event that a new reading was processed
    // This simulates what would be SNS/SQS in AWS
    this.eventEmitter.emit('reading.processed', enhancedReading);

    console.log(`Processed reading for plant ${reading.plantId}`);
  }

  async getReadings(plantId: string): Promise<PowerReading[]> {
    return this.readings.filter(r => r.plantId === plantId);
  }
}