import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './create-worker.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() request: any, @Res() res: any): Promise<CreateWorkerDto[]> {
    const workers: CreateWorkerDto[] = this.workerService.getWorkers(request);
    return res.json(workers);
  }

  @Get(':id')
  findOne(@Param() params: any): CreateWorkerDto {
    return this.workerService.getWorker(params.id);
  }

  @Put(':id')
  update(@Param() params: any, @Body() worker: CreateWorkerDto): CreateWorkerDto {
    return this.workerService.updateWorker(params.id, worker);
  }

  @Post()
  create(@Body() worker: CreateWorkerDto): CreateWorkerDto {
    return this.workerService.createWorker(worker);
  }

  @Delete(':id')
  delete(@Param() params: any): CreateWorkerDto {
    return this.workerService.deleteWorker(params.id);
  }
}
