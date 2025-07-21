import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PowerPlantService } from './power-plant.service';

describe('PowerPlantService', () => {
  let service: PowerPlantService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PowerPlantService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(), // Mock the event emitter
          },
        },
      ],
    }).compile();

    service = module.get<PowerPlantService>(PowerPlantService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPlants', () => {
    it('should return an array of plants', async () => {
      const plants = await service.getPlants();
      expect(plants.length).toBeGreaterThan(0);
      expect(plants[0]).toHaveProperty('id');
      expect(plants[0]).toHaveProperty('name');
    });
  });

  describe('processReading', () => {
    it('should process a valid reading', async () => {
      const reading = {
        plantId: '1',
        timestamp: new Date(),
        powerOutput: 75,
        efficiency: 90, // Add the required efficiency property
      };
      
      await service.processReading(reading);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'reading.processed',
        expect.objectContaining({
          plantId: '1',
          powerOutput: 75,
        })
      );
    });

    it('should reject reading for unknown plant', async () => {
      const reading = {
        plantId: '999',
        timestamp: new Date(),
        powerOutput: 75,
        efficiency: 0, // Add a default efficiency value
      };
      
      await expect(service.processReading(reading)).rejects.toThrow('Plant not found');
    });
  });
});