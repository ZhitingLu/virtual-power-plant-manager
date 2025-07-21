import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PowerReading } from '@vpp/types';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  @OnEvent('reading.processed') // Listen for reading.processed events
  handleReadingProcessed(reading: PowerReading) {
    // In a real app, this would:
    // - Update aggregates in ClickHouse
    // - Trigger alerts if thresholds are exceeded
    // - Send data to monitoring systems
    
    this.logger.log(
      `New reading processed - Plant: ${reading.plantId}, ` +
      `Power: ${reading.powerOutput} MW, ` +
      `Efficiency: ${reading.efficiency}%`
    );
    
    // Simulate slow processing (like a Lambda function)
    setTimeout(() => {
      this.logger.log(`Completed analytics for plant ${reading.plantId}`);
    }, 500);
  }
}