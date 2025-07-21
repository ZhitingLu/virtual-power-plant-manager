import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    // Configure the event emitter
    EventEmitterModule.forRoot({
      // Set this to true to use wildcards
      wildcard: false,
      // The delimiter used to segment namespaces
      delimiter: '.',
      // Maximum number of listeners that can be assigned to an event
      maxListeners: 10,
    }),
  ],
  providers: [AnalyticsService], // Our event handler service
  exports: [EventEmitterModule], // Make it available to other modules
})
export class EventsModule {}