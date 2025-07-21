import { Module } from '@nestjs/common';
import { PowerPlantModule } from './power-plant/power-plant.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PowerPlantModule, // Our feature module
    EventsModule, // Event handling module
  ],
})
export class AppModule {}
