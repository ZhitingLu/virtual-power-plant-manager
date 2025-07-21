import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Importing the ConfigModule to manage environment variables
// and make them available globally in the application

// Importing feature modules
import { PowerPlantModule } from './power-plant/power-plant.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes ConfigService available everywhere
      envFilePath: '.env', // Can also use an array for multi-env support
    }),
    PowerPlantModule, // Our feature module
    EventsModule, // Event handling module
  ],
})
export class AppModule {}
