import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreateWorkerDto } from '../worker/create-worker.dto';

@Injectable()
export class FileManagementService {
  readFileWorker(): CreateWorkerDto[] {
    const fileContent: string = fs.readFileSync(
      './ressources/worker.json',
      'utf8',
    );
    const workers = JSON.parse(fileContent);

    return workers;
  }
}
