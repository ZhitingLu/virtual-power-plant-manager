import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PowerPlantService } from './power-plant.service';
import { PowerPlant, PowerReading } from '@vpp/types';

@Controller('plants') // All routes in this controller will be prefixed with /plants
export class PowerPlantController {
  constructor(private readonly plantService: PowerPlantService) {} // Inject service

  @Get() // Handles GET /plants
  async getPlants(): Promise<PowerPlant[]> {
    return this.plantService.getPlants();
  }

  @Get(':id/readings') // Handles GET /plants/:id/readings
  async getReadings(@Param('id') id: string): Promise<PowerReading[]> {
    return this.plantService.getReadings(id);
  }

  @Post('reading') // Handles POST /plants/reading
  async receiveReading(@Body() reading: PowerReading): Promise<{ message: string }> {
    await this.plantService.processReading(reading);
    return { message: 'Reading processed successfully' };
  }
}