import { Injectable, NotFoundException, Req } from "@nestjs/common";
import * as fs from 'node:fs';
import { CreateWorkerDto } from './create-worker.dto';
import { FileManagementService } from '../file-management/file-management.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class WorkerService {
  constructor(private fileManagementService: FileManagementService) {}

  getWorkers(@Req() request: any): CreateWorkerDto[] {
    try {
      const workers: CreateWorkerDto[] = this.fileManagementService.readFileWorker();
      console.log(request.user);

      workers.map((worker: CreateWorkerDto) => {
        instanceToPlain(new CreateWorkerDto(worker), {
          groups: ['admin'],
        });
      });

      return workers;

    } catch (error) {
      throw new NotFoundException('Workers not found');
    }
  }

  getWorker(id: number): CreateWorkerDto {
    try {
      const workers: CreateWorkerDto[] = this.fileManagementService.readFileWorker();
      const worker = workers[id];
      if (!worker) {
        throw new NotFoundException(`Worker with id ${id} not found`);
      }
      return worker;
    } catch (error) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }
  }

  updateWorker(id: string, worker: CreateWorkerDto): CreateWorkerDto {
    try {
      const workers: CreateWorkerDto[] = this.fileManagementService.readFileWorker();
      workers[id] = worker;
      fs.writeFileSync('./ressources/worker.json', JSON.stringify(workers));
      if (!worker) {
        throw new NotFoundException(`Worker with id ${id} not found`);
      }
      return workers[id];
    } catch (error) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }
  }

  createWorker(worker: CreateWorkerDto): CreateWorkerDto {
    try {
      const workers: CreateWorkerDto[] = this.fileManagementService.readFileWorker();
      workers.push(worker);
      fs.writeFileSync('./ressources/worker.json', JSON.stringify(workers));
      if (!worker) {
        throw new NotFoundException(`Cannot create worker`);
      }
      return worker;
    } catch (error) {
      throw new NotFoundException(`Cannot create worker`);
    }
  }

  deleteWorker(id: number): CreateWorkerDto {
    try {
      const workers: CreateWorkerDto[] = this.fileManagementService.readFileWorker();
      workers.splice(id, 1);
      fs.writeFileSync('./ressources/worker.json', JSON.stringify(workers));
      return workers[id];
    } catch (error) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }
  }
}
