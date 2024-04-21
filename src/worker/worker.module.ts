import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { FileManagementModule } from '../file-management/file-management.module';

@Module({
  providers: [WorkerService],
  controllers: [WorkerController],
  imports: [FileManagementModule],
})
export class WorkerModule {}
