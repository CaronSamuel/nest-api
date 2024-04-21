import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './worker/worker.module';
import { FileManagementModule } from './file-management/file-management.module';

@Module({
  imports: [WorkerModule, FileManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
