import { Module } from '@nestjs/common';
import { PowerPlantController } from './power-plant.controller';
import { PowerPlantService } from './power-plant.service';
import { EventsModule } from '../events/events.module'; 

@Module({
  imports: [EventsModule], // Import other modules we need
  controllers: [PowerPlantController], // Register our controller
  providers: [PowerPlantService], // Register our service
})
export class PowerPlantModule {}